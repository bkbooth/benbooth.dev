import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import Meta from '../components/meta';
import Layout from '../components/layout';
import ArticleMini from '../components/article-mini';
import ArticleInfo from '../components/article-info';
import Article from '../components/styled/article';
import NextPrevLinks from '../components/styled/next-prev-links';
import { HeaderSpacer } from '../components/styled/header';

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { hero: localHero } = post.frontmatter;
  const { childUnsplashHero: unsplashHero } = post;
  const hero =
    localHero && localHero.image
      ? localHero
      : unsplashHero && unsplashHero.image
      ? unsplashHero
      : null;
  const { next, previous } = pageContext;
  return (
    <Layout>
      <Meta
        title={post.frontmatter.title}
        description={post.excerpt}
        path={`/${post.fields.slug}`}
        pageType="article"
      />
      {hero ? (
        <Image
          fluid={hero.image.childImageSharp.fluid}
          alt={hero.alt || 'Unsplash image'}
          style={{ maxHeight: '65vh' }}
        />
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
          {post.frontmatter.unsplashHero && <p>Unsplash: {post.frontmatter.unsplashHero.id}</p>}
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

export const pageQuery = graphql`
  query BLOG_POST_QUERY($slug: String!) {
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
      childUnsplashHero {
        id
        image {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
