import { withStyles } from '@material-ui/core/styles';
import { constant } from 'lodash';

const styles = ({ palette }) => ({
  '@global': {
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },

    html: {
      WebkitFontSmoothing: 'antialiased' /* [1] */,
      MozOsxFontSmoothing: 'grayscale' /* [1] */,
      boxSizing: 'border-box',
    },

    body: {
      minWidth: '320px',
      minHeight: '100vh',
      margin: 0 /* [2] */,
      backgroundColor: palette.background.default,
      '@media print': {
        backgroundColor: palette.common.white, /* [3] */
      },
    },
  },
});

const GlobalStyles = withStyles(styles)(constant(null)); /* [4] */

export default GlobalStyles;
