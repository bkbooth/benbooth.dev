import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { rhythm, scale } from '../utils/typography';

const Wrapper = styled.div`
  position: relative;
`;

const ChildWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Credit = styled.div`
  ${scale(-0.5)};
  line-height: 0.75rem;
  position: absolute;
  left: 0;
  bottom: 0;
  margin: ${rhythm(0.25)};
  font-family: 'Open Sans', sans-serif;
  color: white;
  text-shadow: 0 0 3px black;

  a {
    color: white;
    text-decoration: underline;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const Hero = ({ alt, image, unsplash, children }) => (
  <Wrapper>
    <Image
      fluid={unsplash ? unsplash.image.childImageSharp.fluid : image.childImageSharp.fluid}
      alt={unsplash ? unsplash.description : alt}
      style={{ maxHeight: '65vh', minHeight: '290px' }}
    />
    {children && <ChildWrapper>{children}</ChildWrapper>}
    {unsplash && (
      <Credit>
        Photo by <a href={unsplash.user.links.html}>{unsplash.user.name}</a> on{' '}
        <a href={unsplash.links.html}>Unsplash</a>
        {unsplash.location && <> · {unsplash.location.title}</>}
      </Credit>
    )}
  </Wrapper>
);

Hero.propTypes = {
  alt: requiredIf(PropTypes.string, props => !props.unsplash),
  image: requiredIf(PropTypes.object, props => !props.unsplash),
  unsplash: requiredIf(
    PropTypes.shape({
      image: PropTypes.object,
      description: PropTypes.string,
      links: PropTypes.shape({ html: PropTypes.string }),
      user: PropTypes.shape({
        name: PropTypes.string,
        links: PropTypes.shape({ html: PropTypes.string }),
      }),
      location: PropTypes.shape({ title: PropTypes.string }),
    }),
    props => !props.image
  ),
};

export default Hero;

export const query = graphql`
  fragment UnsplashHeroFields on UnsplashJson {
    description
    links {
      html
    }
    user {
      name
      links {
        html
      }
    }
    location {
      title
    }
    image {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
