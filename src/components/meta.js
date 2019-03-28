import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

function Meta({ description, lang, meta, path, pageType, title }) {
  const {
    site: { siteMetadata: site },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author {
            name
            twitter
          }
        }
      }
    }
  `);

  const metaDescription = description || site.description;
  const canonicalUrl = `${site.siteUrl}${path}/`;
  const image = `${site.siteUrl}/icons/icon-512x512.png`;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site.title}`}
      defaultTitle={site.title}
      meta={[
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
          property: 'og:image',
          content: image,
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
          name: 'twitter:image',
          content: image,
        },
        {
          name: 'twitter:creator',
          content: `@${site.author.twitter}`,
        },
      ].concat(meta)}
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
  meta: [],
  pageType: 'website',
  path: '',
};

Meta.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  pageType: PropTypes.string,
  path: PropTypes.string,
  title: PropTypes.string,
};

export default Meta;
