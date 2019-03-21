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
  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      name: 'slug',
      value: path.basename(node.fileAbsolutePath, '.md'),
      node,
    });
  }
};
