import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

const IndexPage = ({ data }) => {
  const site = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <header>
        <h1>{site.title}</h1>
        <p>{site.description}</p>
      </header>
      <main>
        {posts.map(({ node: post }) => (
          <article key={post.id}>
            <h2>
              <Link to={`/${post.fields.slug}`}>{post.frontmatter.title}</Link>
            </h2>
            <p>
              {post.frontmatter.date} | ~{post.timeToRead} mins
            </p>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            <p>{post.frontmatter.tags.join(', ')}</p>
          </article>
        ))}
      </main>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query INDEX_PAGE_QUERY {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "Do MMMM YYYY")
            tags
          }
        }
      }
    }
  }
`;
