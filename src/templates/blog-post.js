import React from 'react';
import { graphql } from 'gatsby';
import Meta from '../components/meta';
import Layout from '../components/layout';
import Hero from '../components/hero';
import ArticleMini from '../components/article-mini';
import ArticleInfo from '../components/article-info';
import { Article } from '../components/styled/article';
import { NextPrevLinks } from '../components/styled/next-prev-links';
import { HeaderSpacer } from '../components/styled/layout';

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { hero } = post.frontmatter;
  const { next, previous } = pageContext;
  return (
    <Layout>
      <Meta
        title={post.frontmatter.title}
        description={post.excerpt}
        path={`/${post.fields.slug}`}
        pageType="article"
      />
      {post.unsplashHero ? (
        <Hero unsplash={post.unsplashHero} />
      ) : hero ? (
        <Hero image={hero.image} alt={hero.alt} />
      ) : (
        <HeaderSpacer />
      )}
      <Article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <ArticleInfo
            date={post.frontmatter.date}
            timeToRead={post.timeToRead}
            withAuthor={true}
          />
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <footer>
          <p>{post.frontmatter.tags.join(', ')}</p>
        </footer>
      </Article>
      <NextPrevLinks>
        <li>{previous && <ArticleMini article={previous} isPrevious={true} />}</li>
        <li>{next && <ArticleMini article={next} isNext={true} />}</li>
      </NextPrevLinks>
    </Layout>
  );
};

export default BlogPostTemplate;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      timeToRead
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        tags
        hero {
          alt
          image {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      unsplashHero {
        ...UnsplashHeroFields
      }
    }
  }
`;
