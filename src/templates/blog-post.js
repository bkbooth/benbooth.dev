import React from 'react';
import { Link } from 'gatsby';
import format from 'date-fns/format';
import Layout from '../components/layout';

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <Link to="/">‹ {data.site.siteMetadata.title}</Link>
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
        </header>
        <p>
          {format(post.frontmatter.date, 'Do MMMM YYYY')} | ~{post.timeToRead} mins read
        </p>
        <p>{post.frontmatter.tags.join(', ')}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
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
      }
    }
  }
`;
