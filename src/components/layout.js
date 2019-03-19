import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import Header from './styled/header';
import Footer from './styled/footer';

const LogoLink = styled(Link)`
  display: inline-block;
  line-height: 0; /* don't take up any _extra_ vertical space */
`;

const Logo = styled(Image)`
  width: 40px;
  height: 40px;
  img {
    margin: 0;
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={layoutQuery}
    render={data => {
      const { bbLogo, site } = data;
      const { author } = site.siteMetadata;
      return (
        <>
          <Header>
            <LogoLink to="/">
              <Logo fixed={bbLogo.childImageSharp.fixed} alt="Bb logo" />
            </LogoLink>
          </Header>
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
    bbLogo: file(absolutePath: { regex: "/bb-logo.png/" }) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }
`;
