import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ArticleInfo from './article-info';
import { Container, RelativeLabel } from './styled/article-mini';

const ArticleMini = ({ article, isNext = false, isPrev = false, site }) => {
  const canonicalUrl = `${site.siteUrl}/${article.fields.slug}`;
  return (
    <Container alignRight={isPrev} itemScope itemType="https://schema.org/Article">
      <meta itemProp="name" content={article.frontmatter.title} />
      <meta itemProp="url" content={canonicalUrl} />
      <meta itemProp="mainEntityOfPage" content={canonicalUrl} />
      <span itemProp="publisher" itemScope itemType="Person">
        <meta itemProp="name" content={site.title} />
      </span>
      <header>
        <h2>
          {isPrev && <RelativeLabel>Older</RelativeLabel>}
          {isNext && <RelativeLabel>Newer</RelativeLabel>}
          <Link to={`/${article.fields.slug}`} rel={isPrev ? 'prev' : isNext ? 'next' : null}>
            {isPrev && '← '}
            <span itemProp="headline">{article.frontmatter.title}</span>
            {isNext && ' →'}
          </Link>
        </h2>
        <ArticleInfo
          date={article.frontmatter.date}
          timeToRead={article.timeToRead}
          withAuthor={false}
          rightAlign={true}
        />
      </header>
      <p
        dangerouslySetInnerHTML={{ __html: article.frontmatter.description || article.excerpt }}
        itemProp="description"
      />
    </Container>
  );
};

ArticleMini.propTypes = {
  article: PropTypes.shape({
    excerpt: PropTypes.string,
    timeToRead: PropTypes.number.isRequired,
    fields: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
  }).isRequired,
  isNext: PropTypes.bool,
  isPrev: PropTypes.bool,
  site: PropTypes.shape({
    title: PropTypes.string.isRequired,
    siteUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticleMini;
