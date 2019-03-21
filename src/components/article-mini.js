import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ArticleInfo from '../components/article-info';

const ArticleMini = ({ article, isNext = false, isPrevious = false }) => (
  <>
    <header>
      <h2>
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
      />
    </header>
    <p dangerouslySetInnerHTML={{ __html: article.excerpt }} />
  </>
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
