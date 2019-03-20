import styled from 'styled-components';
import { rhythm } from '../../utils/typography';
import { Container as ArticleInfoContainer } from '../article-info';

const Article = styled.article`
  margin: ${rhythm(1.5)} ${rhythm(0.5)};
  padding-bottom: ${rhythm(0.5)};
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  &:last-of-type {
    padding-bottom: 0;
    border: none;
  }

  @media screen and (min-width: 576px) {
    width: 80%;
    max-width: 710px;
    margin: ${rhythm(1.5)} auto;
  }

  /* Overrides for list view */
  h2 {
    margin: 0 0 ${rhythm(0.5)};
  }
  h2 + ${ArticleInfoContainer} {
    margin: ${rhythm(0.5)} 0;
  }
`;

export default Article;
