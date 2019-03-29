import styled from 'styled-components';
import Image from 'gatsby-image';
import { rhythm, scale } from '../../utils/typography';

export const Container = styled.div`
  ${scale(-0.25)}
  display: flex;
  align-items: center;
  margin: ${rhythm(1)} 0;
  line-height: 1.5rem;
`;

export const Photo = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: ${rhythm(0.5)};
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: -5px;
    top: -5px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border-radius: 100%;
    border: 1px solid #0f6d94;
  }
`;

export const StyledImage = styled(Image)`
  width: 50px;
  height: 50px;
  img {
    border-radius: 100%;
    overflow: hidden;
  }
`;

export const Author = styled.div`
  font-weight: 400;
`;

export const Dateline = styled.div`
  opacity: 0.6;
`;

export const Spacer = styled.span`
  margin: 0 ${rhythm(0.25)};
`;
