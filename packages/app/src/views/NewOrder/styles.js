
import baseStyles from '../../assets/jss/baseStyles';

const { contentWrapper } = baseStyles;

const ORDER_DETAIL_WIDTH = 380;
const CATEGORY_CONTAINER_WIDTH = 200;

const styles = theme => ({
  contentWrapper: {
    ...contentWrapper,
    padding: '20px',
  },
  mainContent: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingLeft: `${CATEGORY_CONTAINER_WIDTH}px`,
    width: `calc(100% - ${ORDER_DETAIL_WIDTH}px)`,
  },
  orderBar: {
    width: `${ORDER_DETAIL_WIDTH}px`,
    padding: `${theme.spacing.unit * 3}px`,
  },
  drawer: {
    width: `${ORDER_DETAIL_WIDTH}px`,
    flexShrink: 0,
  },
  categoryDrawer: {
    width: `${CATEGORY_CONTAINER_WIDTH}px`,
    flexShrink: 0,
  },
  categoryContainer: {
    width: `${CATEGORY_CONTAINER_WIDTH}px`,
    // padding: `${theme.spacing.unit}px`,
  },
  orderDetailDrawer: {
    backgroundColor: '#777',
  },
  toolbar: theme.mixins.toolbar,
});


export default styles;
