import React from 'react';
import { graphql, Link } from 'gatsby';
import Meta from '../components/meta';
import Layout from '../components/layout';
import ArticleInfo from '../components/article-info';
import Article from '../components/styled/article';
import Welcome from '../components/styled/welcome';
import { HeaderSpacer } from '../components/styled/header';

const IndexPage = ({ data }) => {
  const site = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Meta />
      <HeaderSpacer />
      <Welcome>
        <h1>{site.title}</h1>
        <p>{site.description}</p>
      </Welcome>
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
