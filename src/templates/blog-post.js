import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import Meta from '../components/meta';
import Layout from '../components/layout';
import ArticleInfo from '../components/article-info';
import Article from '../components/styled/article';

const BlogPostTemplate = ({ data }) => {
  const site = data.site.siteMetadata;
  const post = data.markdownRemark;
  const { hero } = post.frontmatter;
  return (
    <Layout>
      <Meta
        title={post.frontmatter.title}
        description={post.excerpt}
        path={`/${post.fields.slug}`}
        pageType="article"
      />
      {hero && hero.image && (
        <Image
          fluid={hero.image.childImageSharp.fluid}
          alt={hero.alt}
          style={{ maxHeight: '65vh' }}
        />
      )}
      <Link to="/">‹ {site.title}</Link>
      <Article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <ArticleInfo date={post.frontmatter.date} timeToRead={post.timeToRead} />
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <footer>
          <p>{post.frontmatter.tags.join(', ')}</p>
        </footer>
      </Article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BLOG_POST_QUERY($slug: String!) {
    site {
      siteMetadata {
        title
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
    }
  }
`;
