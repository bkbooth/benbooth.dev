import React from 'react';
import { graphql, Link } from 'gatsby';
import Meta from '../components/meta';
import Layout from '../components/layout';
import ArticleInfo from '../components/article-info';
import Article from '../components/styled/article';

const IndexPage = ({ data }) => {
  const site = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Meta />
      <header>
        <h1>{site.title}</h1>
        <p>{site.description}</p>
      </header>
      <main>
        {posts.map(({ node: post }) => (
          <Article key={post.id}>
            <header>
              <h2>
                <Link to={`/${post.fields.slug}`}>{post.frontmatter.title}</Link>
              </h2>
            </header>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            <footer>
              <ArticleInfo date={post.frontmatter.date} timeToRead={post.timeToRead} />
            </footer>
          </Article>
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
            date
          }
        }
      }
    }
  }
`;
