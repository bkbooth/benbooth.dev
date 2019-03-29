import styled from 'styled-components';
import Image from 'gatsby-image';
import { rhythm, scale } from '../../utils/typography';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  text-shadow: 0 0 4px black;
  svg {
    filter: drop-shadow(0 0 4px black);
  }

  @media screen and (min-width: 576px) {
    flex-direction: row;
    width: 80%;
    max-width: 710px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Photo = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  @media screen and (max-width: 575px) {
    width: 100px;
    height: 100px;
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
    border: 3px solid white;
    box-shadow: 0 0 8px black;
  }
`;

export const StyledImage = styled(Image)`
  width: 160px;
  height: 160px;
  @media screen and (max-width: 575px) {
    width: 100px;
    height: 100px;
  }
  img {
    border-radius: 100%;
    overflow: hidden;
  }
`;

export const Details = styled.div`
  @media screen and (max-width: 575px) {
    margin-top: ${rhythm(0.5)};
  }
  @media screen and (min-width: 576px) {
    margin-left: ${rhythm(1)};
  }
`;

export const Title = styled.h1`
  ${scale(0.75)};
  margin-top: 0;
  margin-bottom: ${rhythm(0.5)};
  @media screen and (max-width: 575px) {
    ${scale(0.5)};
    text-align: center;
  }

  a {
    color: white;
    &:first-of-type {
      margin-left: ${rhythm(0.75)};
    }
  }
`;

export const Description = styled.p`
  margin: 0 ${rhythm(0.25)};
  @media screen and (max-width: 575px) {
    ${scale(-0.25)};
    line-height: 0.75rem;
    text-align: center;
    .longer {
      display: none;
    }
  }
`;
