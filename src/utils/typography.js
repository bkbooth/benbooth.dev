import Typography from 'typography';
import sutroTheme from 'typography-theme-sutro';
import { css } from 'styled-components';
import { theme } from './theme';

sutroTheme.overrideThemeStyles = () => ({
  a: { color: theme.colors.primary },
});

const typography = new Typography(sutroTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

// Styled components wrapper for typography.scale
export function scale(amount = 1) {
  const s = typography.scale(amount);
  return css`
    font-size: ${s.fontSize};
    line-height: ${s.lineHeight};
  `;
}

export const { options, rhythm } = typography;
export default typography;
