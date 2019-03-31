import styled from 'styled-components';
import { Container as ArticleInfoContainer } from './article-info';
import { scale } from '../../utils/typography';

export const Container = styled.div`
  @media only screen and (${props => props.theme.breakpoints.min.desktop}) {
    text-align: ${props => (props.alignRight ? 'right' : 'left')};
    ${ArticleInfoContainer} {
      justify-content: ${props => (props.alignRight ? 'flex-end' : 'flex-start')};
    }
  }
`;

export const RelativeLabel = styled.span`
  ${scale(-0.5)};
  font-weight: ${props => props.theme.weights.normal};
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  line-height: 1.25rem;
`;
