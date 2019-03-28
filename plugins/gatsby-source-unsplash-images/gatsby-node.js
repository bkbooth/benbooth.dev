require('isomorphic-fetch');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const { default: Unsplash, toJson } = require('unsplash-js');

const unsplash = new Unsplash({
  applicationId: process.env.GATSBY_UNSPLASH_ACCESS_KEY,
});

exports.onCreateNode = async ({
  actions: { createNode, createParentChildLink },
  node,
  createContentDigest,
  store,
  cache,
}) => {
  if (node.internal.type === 'MarkdownRemark' && node.frontmatter.unsplashHero) {
    try {
      // Get data from Unsplash
      const id = node.frontmatter.unsplashHero;
      const res = await unsplash.photos.getPhoto(id);
      const json = await toJson(res);
      if (json.errors) throw new Error(`Failed loading Unsplash image ID "${id}"`);
      // Trigger download per Unsplash API Guidelines
      // https://help.unsplash.com/api-guidelines/more-on-each-guideline/guideline-triggering-a-download
      unsplash.photos.downloadPhoto(json);

      // Add the photo as a file node
      const fileNode = await createRemoteFileNode({
        url: json.urls.raw,
        store,
        cache,
        createNode,
        createNodeId: createContentDigest,
      });
      if (fileNode) {
        json.image___NODE = fileNode.id;
      }

      // Attach JSON + fileNode to MarkdownRemark node
      const jsonNode = {
        ...json,
        id: json.id,
        children: [],
        parent: node.id,
        internal: {
          type: 'UnsplashHero',
          contentDigest: createContentDigest(json),
          mediaType: 'application/json',
        },
      };
      createNode(jsonNode);
      createParentChildLink({ parent: node, child: jsonNode });
    } catch (err) {
      console.error(err);
    }
  }
};
