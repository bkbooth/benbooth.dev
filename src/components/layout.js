import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import Header from './styled/header';
import Footer from './styled/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

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

const Layout = ({ children }) => {
  const {
    bbLogo,
    site: {
      siteMetadata: { author },
    },
  } = useStaticQuery(graphql`
    query {
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
  `);
  return (
    <>
      <Header>
        <LogoLink to="/">
          <Logo fixed={bbLogo.childImageSharp.fixed} alt="Bb logo" />
        </LogoLink>
      </Header>
      {children}
      <Footer>
        © {new Date().getFullYear()} {author.name}
        <a href={`https://twitter.com/${author.twitter}`}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>{' '}
        <a href={`https://github.com/${author.github}`}>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </Footer>
    </>
  );
};

export default Layout;
