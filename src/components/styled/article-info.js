import styled from 'styled-components';
import Image from 'gatsby-image';
import { rhythm, scale } from '../../utils/typography';

const photoSize = '50px';

export const Container = styled.div`
  ${scale(-0.25)};
  display: flex;
  align-items: center;
  margin: ${rhythm(1)} 0;
  line-height: 1.5rem;
`;

export const Photo = styled.div`
  position: relative;
  width: ${photoSize};
  height: ${photoSize};
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
    border: 1px solid ${props => props.theme.colors.primary};
  }
`;

export const StyledImage = styled(Image)`
  width: ${photoSize};
  height: ${photoSize};
  img {
    border-radius: 100%;
    overflow: hidden;
  }
`;

export const Author = styled.div``;

export const Dateline = styled.div`
  color: ${props => props.theme.colors.muted};
`;

export const Spacer = styled.span`
  margin: 0 ${rhythm(0.25)};
`;
