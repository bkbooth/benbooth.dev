import styled from 'styled-components';
import { rhythm } from '../../utils/typography';
import { Container as ArticleInfoContainer } from './article-info';

export const Article = styled.article`
  margin: ${rhythm(1.5)} ${rhythm(0.5)};
  padding-bottom: ${rhythm(0.5)};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  &:last-child {
    padding-bottom: 0;
    border: none;
  }

  @media screen and (${props => props.theme.breakpoints.min.desktop}) {
    width: ${props => props.theme.sizes.content.width};
    max-width: ${props => props.theme.sizes.content.maxWidth};
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
