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
  line-height: 0.9rem;
  position: absolute;
  left: 0;
  bottom: 0;
  margin: ${rhythm(0.25)};
  font-family: ${props => props.theme.fonts.sans};
  color: ${props => props.theme.colors.light};

  text-shadow: 0 0 3px ${props => props.theme.colors.dark};
  svg {
    filter: drop-shadow(0 0 3px ${props => props.theme.colors.dark});
  }

  a {
    color: ${props => props.theme.colors.light};
    text-decoration: underline;
    &:hover {
      opacity: 0.75;
    }
  }
`;
