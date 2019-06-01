
import baseStyles from '../../assets/jss/baseStyles';

const { contentWrapper } = baseStyles;

const DRAWER_WIDTH = 260;

const styles = theme => ({
  contentWrapper: {
    ...contentWrapper,
    padding: '20px',
  },
  mainContent: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: `${theme.spacing.unit * 3}px`,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
  },
  orderBar: {
    width: `${DRAWER_WIDTH}px`,
    padding: `${theme.spacing.unit * 3}px`,
  },
});


export default styles;
