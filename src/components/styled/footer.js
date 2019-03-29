import styled from 'styled-components';
import { rhythm, scale } from '../../utils/typography';

const Footer = styled.footer`
  ${scale(-0.25)}
  margin: ${rhythm(2)} 0 0;
  padding: ${rhythm(0.5)};

  a:first-of-type {
    margin-left: ${rhythm(0.25)};
  }
`;

export default Footer;
