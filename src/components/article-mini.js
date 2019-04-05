import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ArticleInfo from './article-info';
import { Container, RelativeLabel } from './styled/article-mini';

const ArticleMini = ({ article, isNext = false, isPrevious = false }) => (
  <Container alignRight={isPrevious} itemScope itemType="https://schema.org/Article">
    <header>
      <h2>
        {isPrevious && <RelativeLabel>Older</RelativeLabel>}
        {isNext && <RelativeLabel>Newer</RelativeLabel>}
        <Link to={`/${article.fields.slug}`} rel={isPrevious ? 'prev' : isNext ? 'next' : null}>
          {isPrevious && '← '}
          <span itemProp="name">{article.frontmatter.title}</span>
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
  isPrevious: PropTypes.bool,
};

export default ArticleMini;
