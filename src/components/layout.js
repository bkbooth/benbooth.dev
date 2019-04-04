import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { GlobalStyle } from './styled/global';
import { Footer, Header, Logo, LogoLink } from './styled/layout';
import { theme } from '../utils/theme';

const Layout = ({ children }) => {
  const {
    bbLogo,
    site: { siteMetadata: site },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          social {
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
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Header>
          <LogoLink to="/">
            <Logo fixed={bbLogo.childImageSharp.fixed} alt="Bb logo" />
          </LogoLink>
        </Header>
        {children}
        <Footer>
          © {new Date().getFullYear()} {site.author}
          <a href={`https://twitter.com/${site.social.twitter}`}>
            <FontAwesomeIcon icon={faTwitter} fixedWidth />
          </a>{' '}
          <a href={`https://github.com/${site.social.github}`}>
            <FontAwesomeIcon icon={faGithub} fixedWidth />
          </a>{' '}
          <Link to="/rss.xml">
            <FontAwesomeIcon icon={faRss} fixedWidth />
          </Link>{' '}
        </Footer>
      </>
    </ThemeProvider>
  );
};

export default Layout;
