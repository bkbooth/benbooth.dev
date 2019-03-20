import React from 'react';
import { graphql, Link } from 'gatsby';
import Meta from '../components/meta';
import Layout from '../components/layout';
import Welcome from '../components/welcome';
import ArticleInfo from '../components/article-info';
import Article from '../components/styled/article';
import { HeaderSpacer } from '../components/styled/header';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Meta />
      <HeaderSpacer />
      <Welcome />
      <main>
        {posts.map(({ node: post }) => (
          <Article key={post.id}>
            <header>
              <h2>
                <Link to={`/${post.fields.slug}`}>{post.frontmatter.title}</Link>
              </h2>
              <ArticleInfo
                date={post.frontmatter.date}
                timeToRead={post.timeToRead}
                withAuthor={false}
              />
            </header>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </Article>
        ))}
      </main>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query INDEX_PAGE_QUERY {
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
