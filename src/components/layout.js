import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Layout = ({ children }) => (
  <StaticQuery
    query={layoutQuery}
    render={data => {
      const { author } = data.site.siteMetadata;
      return (
        <>
          {children}
          <footer>
            © {new Date().getFullYear()} {author.name} |{' '}
            <a href={`https://twitter.com/${author.twitter}`}>Twitter</a> |{' '}
            <a href={`https://github.com/${author.github}`}>GitHub</a>
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
        author {
          name
          twitter
          github
        }
      }
    }
  }
`;
