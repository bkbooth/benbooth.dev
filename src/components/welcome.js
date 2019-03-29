import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { rhythm, scale } from '../utils/typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  text-shadow: 0 0 4px black;
  svg {
    filter: drop-shadow(0 0 4px black);
  }

  @media screen and (min-width: 576px) {
    flex-direction: row;
    width: 80%;
    max-width: 710px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Photo = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  @media screen and (max-width: 575px) {
    width: 100px;
    height: 100px;
  }
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: -3px;
    top: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    border-radius: 100%;
    border: 3px solid white;
    box-shadow: 0 0 8px black;
  }
`;

const StyledImage = styled(Image)`
  width: 160px;
  height: 160px;
  @media screen and (max-width: 575px) {
    width: 100px;
    height: 100px;
  }
  img {
    border-radius: 100%;
    overflow: hidden;
  }
`;

const Details = styled.div`
  @media screen and (max-width: 575px) {
    margin-top: ${rhythm(0.5)};
  }
  @media screen and (min-width: 576px) {
    margin-left: ${rhythm(1)};
  }
`;

const Title = styled.h1`
  ${scale(0.75)};
  margin-top: 0;
  margin-bottom: ${rhythm(0.5)};
  @media screen and (max-width: 575px) {
    ${scale(0.5)};
    text-align: center;
  }

  a {
    color: white;
    &:first-of-type {
      margin-left: ${rhythm(0.75)};
    }
  }
`;

const Description = styled.p`
  margin: 0 ${rhythm(0.25)};
  @media screen and (max-width: 575px) {
    ${scale(-0.25)};
    line-height: 0.75rem;
    text-align: center;
    .longer {
      display: none;
    }
  }
`;

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
