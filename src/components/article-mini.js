import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ArticleInfo from './article-info';
import { RelativeLabel, Wrapper } from './styled/article-mini';

const ArticleMini = ({ article, isNext = false, isPrevious = false }) => (
  <Wrapper alignRight={isPrevious}>
    <header>
      <h2>
        {isPrevious && <RelativeLabel>Older</RelativeLabel>}
        {isNext && <RelativeLabel>Newer</RelativeLabel>}
        <Link to={`/${article.fields.slug}`}>
          {isPrevious && '← '}
          {article.frontmatter.title}
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
    <p dangerouslySetInnerHTML={{ __html: article.excerpt }} />
  </Wrapper>
);

ArticleMini.propTypes = {
  article: PropTypes.shape({
    excerpt: PropTypes.string.isRequired,
    timeToRead: PropTypes.number.isRequired,
    fields: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isNext: PropTypes.bool,
  isPrevious: PropTypes.bool,
};

export default ArticleMini;
