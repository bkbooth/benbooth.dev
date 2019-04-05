import React from 'react';
import { graphql } from 'gatsby';
import Meta from '../components/meta';
import Layout from '../components/layout';
import Hero from '../components/hero';
import ArticleMini from '../components/article-mini';
import ArticleInfo from '../components/article-info';
import { Article } from '../components/styled/article';
import { NextPrevPostLinks } from '../components/styled/next-prev-post-links';
import { HeaderSpacer } from '../components/styled/layout';

const BlogPostTemplate = ({ data, pageContext }) => {
  const {
    site: { siteMetadata: site },
    markdownRemark: post,
  } = data;
  const { hero } = post.frontmatter;
  const { nextPost, previousPost } = pageContext;
  const canonicalUrl = site.siteUrl + post.fields.slug;
  return (
    <Layout>
      <Meta
        title={post.frontmatter.title}
        description={post.excerpt}
        path={`/${post.fields.slug}`}
        pageType="article"
        useDefaultImage={!(post.unsplashHero || hero)}
      />
      <div itemScope itemType="https://schema.org/Article">
        <meta itemProp="name" content={post.frontmatter.title} />
        <meta itemProp="url" content={canonicalUrl} />
        <meta itemProp="mainEntityOfPage" content={canonicalUrl} />
        <span itemProp="publisher" itemScope itemType="https://schema.org/Person">
          <meta itemProp="name" content={site.title} />
        </span>
        {post.unsplashHero ? (
          <Hero unsplash={post.unsplashHero} includeMetadata={true} site={site} />
        ) : hero ? (
          <Hero image={hero.image} alt={hero.alt} includeMetadata={true} site={site} />
        ) : (
          <HeaderSpacer />
        )}
        <Article>
          <header>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <ArticleInfo
              date={post.frontmatter.date}
              timeToRead={post.timeToRead}
              withAuthor={true}
            />
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
        </Article>
      </div>
      <NextPrevPostLinks>
        <li>{previousPost && <ArticleMini article={previousPost} isPrev={true} site={site} />}</li>
        <li>{nextPost && <ArticleMini article={nextPost} isNext={true} site={site} />}</li>
      </NextPrevPostLinks>
    </Layout>
  );
};

export default BlogPostTemplate;

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
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
