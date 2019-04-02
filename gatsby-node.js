const path = require('path');

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
              description
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

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  // Add slug field to Markdown nodes
  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      name: 'slug',
      value: path.basename(node.fileAbsolutePath, '.md'),
      node,
    });
  }
};

exports.sourceNodes = ({ getNodesByType }) => {
  // Link Unsplash JSON nodes to their associated image file node
  const fileNodes = getNodesByType('File').filter(node => node.extension !== 'json');
  const unsplashNodes = getNodesByType('UnsplashJson');
  unsplashNodes.forEach(unsplashNode => {
    const fileNode = fileNodes.find(node => node.name === unsplashNode.id);
    if (!fileNode) return;
    // Images downloaded to the same directory as the JSON files
    unsplashNode.image = `./${fileNode.base}`;
  });

  // Link Markdown nodes to Unsplash JSON nodes
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
