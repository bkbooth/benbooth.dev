import styled from 'styled-components';
import { rhythm } from '../../utils/typography';

export const Article = styled.article`
  margin: ${rhythm(2)} ${rhythm(0.5)};

  @media screen and (min-width: 576px) {
    width: 80%;
    max-width: 710px;
    margin: ${rhythm(2)} auto;
  }
`;
