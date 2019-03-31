const path = require('path');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
        edges {
          node {
            excerpt
            timeToRead
            fields {
              slug
            }
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  // Create blog post pages
  const posts = result.data.allMarkdownRemark.edges;
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = async ({
  actions: { createNode, createNodeField },
  cache,
  createContentDigest,
  getNodesByType,
  node,
  store,
}) => {
  // Add slug field to Markdown nodes
  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      name: 'slug',
      value: path.basename(node.fileAbsolutePath, '.md'),
      node,
    });
  }

  // Link Unsplash JSON nodes to their associated image file node
  if (node.internal.type === 'UnsplashJson') {
    const localFileNode = getNodesByType('File')
      .filter(fileNode => fileNode.extension !== 'json')
      .find(fileNode => fileNode.name === node.id);
    if (localFileNode) {
      // Images downloaded to the same directory as the JSON files
      node.image = `./${localFileNode.base}`;
    } else {
      // Link to image as remote file node
      const remoteFileNode = await createRemoteFileNode({
        url: node.urls.raw,
        store,
        cache,
        createNode,
        createNodeId: createContentDigest,
      });
      if (remoteFileNode) {
        // ___NODE tells Gatsby to link the nodes
        node.image___NODE = remoteFileNode.id;
      }
    }
  }
};

exports.sourceNodes = ({ getNodesByType }) => {
  // Link Markdown nodes to Unsplash JSON nodes
  const unsplashNodes = getNodesByType('UnsplashJson');
  getNodesByType('MarkdownRemark')
    .filter(node => Boolean(node.frontmatter.unsplashHero))
    .forEach(markdownNode => {
      const unsplashNode = unsplashNodes.find(
        node => node.id === markdownNode.frontmatter.unsplashHero
      );
      if (!unsplashNode) return;
      // ___NODE tells Gatsby to link the nodes
      markdownNode.unsplashHero___NODE = unsplashNode.id;
    });
};
