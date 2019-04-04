const path = require('path');

const POSTS_PER_PAGE = 5;

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

  const posts = result.data.allMarkdownRemark.edges;
  const numberOfPosts = posts.length;

  // Create pagination pages
  const numberOfPages = Math.ceil(numberOfPosts / POSTS_PER_PAGE);
  Array.from({ length: numberOfPages }).forEach((_, index) => {
    createPage({
      path: paginationPath(index, numberOfPages),
      component: path.resolve('./src/templates/blog-list.js'),
      context: {
        skip: index * POSTS_PER_PAGE,
        limit: POSTS_PER_PAGE,
        page: index + 1,
        numberOfPages,
        previousPath: paginationPath(index + 1, numberOfPages),
        nextPath: paginationPath(index - 1, numberOfPages),
      },
    });
  });

  // Create blog post pages
  posts.forEach((post, index) => {
    createPage({
      path: post.node.fields.slug,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: post.node.fields.slug,
        previousPost: index === numberOfPosts - 1 ? null : posts[index + 1].node,
        nextPost: index === 0 ? null : posts[index - 1].node,
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

/**
 * Get the pagination path for the given page
 *
 * @param {number} page
 * @param {number} numberOfPages
 * @returns {string|null}
 */
function paginationPath(page, numberOfPages) {
  if (page === 0) return '/';
  if (0 < page && page < numberOfPages) return `page/${page + 1}`;
  return null;
}
