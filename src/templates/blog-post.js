import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import format from 'date-fns/format';
import Layout from '../components/layout';
import { Article } from '../components/styled/article';

const BlogPostTemplate = ({ data }) => {
  const site = data.site.siteMetadata;
  const post = data.markdownRemark;
  const { hero } = post.frontmatter;
  return (
    <Layout>
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
        </header>
        <p>
          {format(post.frontmatter.date, 'Do MMMM YYYY')} | ~{post.timeToRead} mins read
        </p>
        <p>{post.frontmatter.tags.join(', ')}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
      html
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
