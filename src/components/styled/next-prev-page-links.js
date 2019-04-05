import styled from 'styled-components';
import { rhythm, scale } from '../../utils/typography';

export const NextPrevPageLinks = styled.ul`
  display: grid;
  grid-template-columns: 1fr 110px 1fr;
  margin: ${rhythm(2)} 0 0;
  padding: ${rhythm(0.5)};
  list-style: none;
  li {
    ${scale(-0.25)};
    line-height: 1.25rem;
    &:nth-child(2) {
      ${scale(-0.5)};
      line-height: 1.25rem;
      color: ${props => props.theme.colors.muted};
      text-align: center;
    }
    &:last-child {
      text-align: right;
    }
    a {
      font-family: ${props => props.theme.fonts.sans};
      text-transform: uppercase;
      letter-spacing: 0.05rem;
      padding: ${rhythm(0.125)} ${rhythm(0.25)};
      border: 1px solid ${props => props.theme.colors.border};
      border-radius: ${rhythm(0.25)};
    }
  }
`;
