import Typography from 'typography';
import sutroTheme from 'typography-theme-sutro';

const typography = new Typography(sutroTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export const { options, rhythm, scale } = typography;
export default typography;
