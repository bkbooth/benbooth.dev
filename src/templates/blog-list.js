import React from 'react';
import { graphql, Link } from 'gatsby';
import Meta from '../components/meta';
import Layout from '../components/layout';
import Hero from '../components/hero';
import Intro from '../components/intro';
import ArticleMini from '../components/article-mini';
import { Article } from '../components/styled/article';
import { NextPrevPageLinks } from '../components/styled/next-prev-page-links';

const IndexPage = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const { previousPath, nextPath, page, numberOfPages } = pageContext;
  return (
    <Layout>
      <Meta />
      <Hero unsplash={data.unsplashHero}>
        <Intro />
      </Hero>
      <main>
        {posts.map(({ node: post }) => (
          <Article key={post.id}>
            <ArticleMini article={post} />
          </Article>
        ))}
      </main>
      <NextPrevPageLinks>
        <li>
          {previousPath && (
            <Link to={previousPath} rel="prev">
              ← Older
            </Link>
          )}
        </li>
        <li>
          Page {page} of {numberOfPages}
        </li>
        <li>
          {nextPath && (
            <Link to={nextPath} rel="next">
              Newer →
            </Link>
          )}
        </li>
      </NextPrevPageLinks>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
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
            description
          }
        }
      }
    }
    unsplashHero: unsplashJson(id: { eq: "3c_akLTXTek" }) {
      ...UnsplashHeroFields
    }
  }
`;
