import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { ChildContainer, Container, Credit } from './styled/hero';

const Hero = ({ alt, image, unsplash, includeMetadata, site, children }) => {
  const heroImage = unsplash ? unsplash.image : image;
  const imageUrl = includeMetadata ? site.siteUrl + heroImage.childImageSharp.fluid.src : null;
  return (
    <Container>
      {includeMetadata && (
        <>
          <Helmet>
            <meta name="og:image" content={imageUrl} />
            <meta name="twitter:image" content={imageUrl} />
          </Helmet>
          <meta itemProp="image" content={imageUrl} />
        </>
      )}
      <Image
        fluid={heroImage.childImageSharp.fluid}
        alt={unsplash ? unsplash.description || `Unsplash image ${unsplash.id}` : alt}
        style={{ maxHeight: '65vh', minHeight: '290px' }}
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
};

Hero.defaultProps = {
  includeMetadata: false,
};

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
  includeMetadata: PropTypes.bool.isRequired,
  site: PropTypes.shape({
    siteUrl: PropTypes.string.isRequired,
  }),
};

export default Hero;

export const query = graphql`
  fragment UnsplashHeroFields on UnsplashJson {
    id
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
