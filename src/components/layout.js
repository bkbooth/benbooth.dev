import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Layout = ({ children }) => (
  <StaticQuery
    query={layoutQuery}
    render={data => {
      const { author, social } = data.site.siteMetadata;
      return (
        <>
          {children}
          <footer>
            © {new Date().getFullYear()} {author} |{' '}
            <a href={`https://twitter.com/${social.twitter}`}>Twitter</a> |{' '}
            <a href={`https://github.com/${social.github}`}>GitHub</a>
          </footer>
        </>
      );
    }}
  />
);

export default Layout;

const layoutQuery = graphql`
  query LAYOUT_QUERY {
    site {
      siteMetadata {
        author
        social {
          twitter
          github
        }
      }
    }
  }
`;
