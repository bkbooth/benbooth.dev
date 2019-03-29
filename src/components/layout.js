import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Footer, Header, Logo, LogoLink } from './styled/layout';
import { theme } from '../utils/theme';

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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default Layout;
