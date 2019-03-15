import styled from 'styled-components';
import { rhythm } from '../../utils/typography';

const Article = styled.article`
  margin: ${rhythm(1.5)} ${rhythm(0.5)};
  padding-bottom: ${rhythm(0.5)};
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

  @media screen and (min-width: 576px) {
    width: 80%;
    max-width: 710px;
    margin: ${rhythm(1.5)} auto;
  }

  h2 {
    margin-top: 0;
  }
`;

export default Article;
