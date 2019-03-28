import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import { rhythm, scale } from '../utils/typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${rhythm(1)} ${rhythm(0.5)} ${rhythm(2)};

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
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: -5px;
    top: -5px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border-radius: 100%;
    border: 1px solid #0f6d94;
  }
`;

const StyledImage = styled(Image)`
  width: 160px;
  height: 160px;
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
  ${scale(0.75)}
  margin-top: 0;
  margin-bottom: ${rhythm(0.5)};
  @media screen and (max-width: 575px) {
    text-align: center;
  }
`;

const Description = styled.p`
  margin: 0;
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
          }
        }
      }
      profilePic: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 160, height: 160) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `);
  return (
    <Container>
      <Photo>
        <StyledImage
          fixed={profilePic.childImageSharp.fixed}
          alt={`Photo of ${site.author.name}`}
        />
      </Photo>
      <Details>
        <Title>{site.title}</Title>
        <Description>{site.description}</Description>
      </Details>
    </Container>
  );
};

export default Welcome;
