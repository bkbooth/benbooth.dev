import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Container, Description, Details, Photo, StyledImage, Title } from './styled/intro';

const Intro = () => {
  const {
    profilePic,
    site: { siteMetadata: site },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          shortDescription
          author
          social {
            twitter
            github
          }
        }
      }
      profilePic: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 160) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);
  return (
    <Container>
      <Photo>
        <StyledImage fluid={profilePic.childImageSharp.fluid} alt={`Photo of ${site.author}`} />
      </Photo>
      <Details>
        <Title>
          {site.title}
          <a
            href={`https://twitter.com/${site.social.twitter}`}
            title={`@${site.social.twitter} on Twitter`}
          >
            <FontAwesomeIcon icon={faTwitter} size="xs" />
          </a>{' '}
          <a
            href={`https://github.com/${site.social.github}`}
            title={`${site.social.github} on GitHub`}
          >
            <FontAwesomeIcon icon={faGithub} size="xs" />
          </a>
        </Title>
        <Description>
          <span className="shorter">{site.shortDescription}</span>
          <span className="longer">{site.description}</span>
        </Description>
      </Details>
    </Container>
  );
};

export default Intro;
