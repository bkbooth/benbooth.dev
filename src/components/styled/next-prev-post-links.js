import styled from 'styled-components';
import { Container as ArticleInfoContainer } from './article-info';
import { rhythm, scale } from '../../utils/typography';

export const NextPrevPostLinks = styled.ul`
  ${scale(-0.25)};
  display: grid;
  grid-gap: ${rhythm(2)};
  margin: ${rhythm(2)} 0 0;
  padding: ${rhythm(0.5)};
  list-style: none;
  @media only screen and (${props => props.theme.breakpoints.min.desktop}) {
    grid-template-columns: 1fr 1fr;
  }
  li {
    margin: 0;
    h2 {
      ${scale(0.25)};
      margin: 0 0 ${rhythm(0.5)};
    }
    ${ArticleInfoContainer} {
      margin: ${rhythm(0.5)} 0;
    }
  }
`;
