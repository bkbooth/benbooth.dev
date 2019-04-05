import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

function Meta({ description, lang, path, pageType, title, useDefaultImage }) {
  const {
    site: { siteMetadata: site },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          social {
            twitter
          }
        }
      }
    }
  `);

  const metaDescription = description || site.description;
  const canonicalUrl = site.siteUrl + path;
  const defaultImage = `${site.siteUrl}/icons/icon-512x512.png`;

  const meta = [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: pageType,
    },
    {
      property: 'og:title',
      content: title || site.title,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:url',
      content: canonicalUrl,
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: title || site.title,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
    {
      name: 'twitter:creator',
      content: `@${site.social.twitter}`,
    },
  ];
  if (useDefaultImage) {
    meta.concat([
      {
        property: 'og:defaultImage',
        content: defaultImage,
      },
      {
        name: 'twitter:image',
        content: defaultImage,
      },
    ]);
  }

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site.title}`}
      defaultTitle={site.title}
      meta={meta}
      link={[
        {
          rel: 'canonical',
          href: canonicalUrl,
        },
      ]}
    />
  );
}

Meta.defaultProps = {
  lang: 'en-AU',
  pageType: 'website',
  path: '',
  useDefaultImage: true,
};

Meta.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  pageType: PropTypes.string,
  path: PropTypes.string,
  title: PropTypes.string,
  useDefaultImage: PropTypes.bool,
};

export default Meta;
