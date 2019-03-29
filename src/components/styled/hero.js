import styled from 'styled-components';
import { rhythm, scale } from '../../utils/typography';

export const Container = styled.div`
  position: relative;
`;

export const ChildContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Credit = styled.div`
  ${scale(-0.5)};
  line-height: 0.75rem;
  position: absolute;
  left: 0;
  bottom: 0;
  margin: ${rhythm(0.25)};
  font-family: 'Open Sans', sans-serif;
  color: white;

  text-shadow: 0 0 3px black;
  svg {
    filter: drop-shadow(0 0 3px black);
  }

  a {
    color: white;
    text-decoration: underline;
    &:hover {
      opacity: 0.5;
    }
  }
`;
