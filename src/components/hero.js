import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { ChildContainer, Container, Credit } from './styled/hero';

const Hero = ({ alt, image, unsplash, children }) => (
  <Container>
    <Image
      fluid={unsplash ? unsplash.image.childImageSharp.fluid : image.childImageSharp.fluid}
      alt={unsplash ? unsplash.description : alt}
      style={{ maxHeight: '65vh', minHeight: '290px' }}
      itemProp="image"
    />
    {children && <ChildContainer>{children}</ChildContainer>}
    {unsplash && (
      <Credit>
        <FontAwesomeIcon icon={faCamera} fixedWidth /> by{' '}
        <a href={unsplash.user.links.html}>{unsplash.user.name}</a> on{' '}
        <a href={unsplash.links.html}>Unsplash</a>
        {unsplash.location && (
          <>
            {' '}
            · <FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth /> {unsplash.location.title}
          </>
        )}
      </Credit>
    )}
  </Container>
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
