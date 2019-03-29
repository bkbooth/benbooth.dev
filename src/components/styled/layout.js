import styled from 'styled-components';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import { rhythm, scale } from '../../utils/typography';

export const Header = styled.header`
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

export const HeaderSpacer = styled.div`
  height: calc(40px + (2 * ${rhythm(1)}));
`;

export const Footer = styled.footer`
  ${scale(-0.25)}
  margin: ${rhythm(2)} 0 0;
  padding: ${rhythm(0.5)};

  a:first-of-type {
    margin-left: ${rhythm(0.25)};
  }
`;

export const LogoLink = styled(Link)`
  display: inline-block;
  line-height: 0; /* don't take up any _extra_ vertical space */
`;

export const Logo = styled(Image)`
  width: 40px;
  height: 40px;
  img {
    margin: 0;
  }
`;
