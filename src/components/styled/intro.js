import styled from 'styled-components';
import Image from 'gatsby-image';
import { rhythm, scale } from '../../utils/typography';

const imageSizes = {
  sm: '100px',
  lg: '160px',
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.colors.light};

  text-shadow: 0 0 4px ${props => props.theme.colors.dark};
  svg {
    filter: drop-shadow(0 0 4px ${props => props.theme.colors.dark});
  }

  @media only screen and (${props => props.theme.breakpoints.min.desktop}) {
    flex-direction: row;
    width: ${props => props.theme.sizes.content.width};
    max-width: ${props => props.theme.sizes.content.maxWidth};
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Photo = styled.div`
  position: relative;
  width: ${imageSizes.sm};
  height: ${imageSizes.sm};
  @media only screen and (${props => props.theme.breakpoints.min.desktop}) {
    width: ${imageSizes.lg};
    height: ${imageSizes.lg};
  }
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: -3px;
    top: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    border-radius: 100%;
    border: 3px solid ${props => props.theme.colors.light};
    box-shadow: 0 0 8px ${props => props.theme.colors.dark};
  }
`;

export const StyledImage = styled(Image)`
  width: ${imageSizes.sm};
  height: ${imageSizes.sm};
  @media only screen and (${props => props.theme.breakpoints.min.desktop}) {
    width: ${imageSizes.lg};
    height: ${imageSizes.lg};
  }
  img {
    border-radius: 100%;
    overflow: hidden;
  }
`;

export const Details = styled.div`
  @media only screen and (${props => props.theme.breakpoints.max.mobile}) {
    margin-top: ${rhythm(0.5)};
  }
  @media only screen and (${props => props.theme.breakpoints.min.desktop}) {
    margin-left: ${rhythm(1)};
  }
`;

export const Title = styled.h1`
  ${scale(0.5)};
  text-align: center;
  margin-top: 0;
  margin-bottom: ${rhythm(0.5)};
  @media only screen and (${props => props.theme.breakpoints.min.desktop}) {
    ${scale(0.75)};
    text-align: left;
  }

  a {
    color: ${props => props.theme.colors.light};
    &:hover {
      opacity: 0.75;
    }
    &:first-of-type {
      margin-left: ${rhythm(0.5)};
    }
  }
`;

export const Description = styled.p`
  margin: 0 ${rhythm(0.25)};
  @media only screen and (${props => props.theme.breakpoints.max.mobile}) {
    ${scale(-0.25)};
    line-height: 0.75rem;
    text-align: center;
    .longer {
      display: none;
    }
  }
  @media only screen and (${props => props.theme.breakpoints.min.desktop}) {
    .shorter {
      display: none;
    }
  }
`;
