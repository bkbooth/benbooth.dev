import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Footer } from './styled/footer';

const Layout = ({ children }) => (
  <StaticQuery
    query={layoutQuery}
    render={data => {
      const { author } = data.site.siteMetadata;
      return (
        <>
          {children}
          <Footer>
            © {new Date().getFullYear()} {author.name} |{' '}
            <a href={`https://twitter.com/${author.twitter}`}>Twitter</a> |{' '}
            <a href={`https://github.com/${author.github}`}>GitHub</a>
          </Footer>
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
