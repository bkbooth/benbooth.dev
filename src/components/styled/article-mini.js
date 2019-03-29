import styled from 'styled-components';
import { Container as ArticleInfoContainer } from './article-info';
import { scale } from '../../utils/typography';

export const Container = styled.div`
  @media screen and (min-width: 576px) {
    text-align: ${({ alignRight }) => (alignRight ? 'right' : 'left')};
    ${ArticleInfoContainer} {
      justify-content: ${({ alignRight }) => (alignRight ? 'flex-end' : 'flex-start')};
    }
  }
`;

export const RelativeLabel = styled.span`
  ${scale(-0.5)};
  font-weight: 300;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  line-height: 1.25rem;
`;
