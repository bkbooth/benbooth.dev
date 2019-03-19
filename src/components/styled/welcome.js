import styled from 'styled-components';
import { rhythm } from '../../utils/typography';

const Welcome = styled.div`
  margin-top: ${rhythm(1)};
  margin-bottom: ${rhythm(3)};
  margin-left: ${rhythm(0.5)};
  margin-right: ${rhythm(0.5)};

  @media screen and (min-width: 576px) {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  h1 {
    margin-top: 0;
  }
`;

export default Welcome;
