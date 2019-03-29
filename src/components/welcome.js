import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Container, Description, Details, Photo, StyledImage, Title } from './styled/welcome';

const Welcome = () => {
  const {
    profilePic,
    site: { siteMetadata: site },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author {
            name
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
  const [shortDescription, longerDescription] = site.description.split('///');
  return (
    <Container>
      <Photo>
        <StyledImage
          fluid={profilePic.childImageSharp.fluid}
          alt={`Photo of ${site.author.name}`}
        />
      </Photo>
      <Details>
        <Title>
          {site.title}
          <a href={`https://twitter.com/${site.author.twitter}`}>
            <FontAwesomeIcon icon={faTwitter} size="xs" />
          </a>{' '}
          <a href={`http://github.com/${site.author.github}`}>
            <FontAwesomeIcon icon={faGithub} size="xs" />
          </a>
        </Title>
        <Description>
          {shortDescription} <span className="longer">{longerDescription}</span>
        </Description>
      </Details>
    </Container>
  );
};

export default Welcome;
