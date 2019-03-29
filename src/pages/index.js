import React from 'react';
import { graphql } from 'gatsby';
import Meta from '../components/meta';
import Layout from '../components/layout';
import Hero from '../components/hero';
import Welcome from '../components/welcome';
import ArticleMini from '../components/article-mini';
import { Article } from '../components/styled/article';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Meta />
      <Hero unsplash={data.unsplashHero}>
        <Welcome />
      </Hero>
      <main>
        {posts.map(({ node: post }) => (
          <Article key={post.id}>
            <ArticleMini article={post} />
          </Article>
        ))}
      </main>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
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
    unsplashHero: unsplashJson(id: { eq: "3c_akLTXTek" }) {
      ...UnsplashHeroFields
    }
  }
`;
