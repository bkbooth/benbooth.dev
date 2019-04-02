import { createGlobalStyle } from 'styled-components';
import { rhythm } from '../../utils/typography';

export const GlobalStyle = createGlobalStyle`
  /* Prism container style overrides */
  pre[class*="language-"] {
    margin: 0 0 ${rhythm(1)};
    border-radius: ${rhythm(0.25)};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
`;
