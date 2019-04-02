import { createGlobalStyle } from 'styled-components';
import { rhythm } from '../../utils/typography';

export const GlobalStyle = createGlobalStyle`
  /* Prism block container style overrides */
  pre[class*="language-"] {
    margin: 0 0 ${rhythm(1)};
    background-color: ${props => props.theme.colors.codeBg};
    border-color: ${props => props.theme.colors.border};
    border-radius: ${rhythm(0.25)};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
  /* Prism inline style overrides */
  :not(pre) > code[class*="language-"] {
    background-color: ${props => props.theme.colors.codeBg};
    border-color: ${props => props.theme.colors.border};
  }
`;
