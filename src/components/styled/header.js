import styled from 'styled-components';
import { rhythm } from '../../utils/typography';

const Header = styled.header`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: ${rhythm(1)} ${rhythm(0.5)};
  @media screen and (min-width: 576px) {
    padding: ${rhythm(1)};
  }
`;

export default Header;

export const HeaderSpacer = styled.div`
  height: calc(40px + (2 * ${rhythm(1)}));
`;
