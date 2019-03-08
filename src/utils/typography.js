import Typography from 'typography';
import sutroTheme from 'typography-theme-sutro';

sutroTheme.overrideThemeStyles = () => ({
  a: { color: '#0f6d94' },
});

const typography = new Typography(sutroTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export const { options, rhythm, scale } = typography;
export default typography;
