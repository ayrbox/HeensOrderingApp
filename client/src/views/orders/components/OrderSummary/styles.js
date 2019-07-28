import grey from '@material-ui/core/colors/grey';
import baseStyles from '../../../../assets/jss/baseStyles';

const { contentWrapper } = baseStyles;

const styles = {
  contentWrapper,
  card: {
    backgroundColor: '#fff',
    marginBottom: '20px',
    marginLeft: '20px',
    minWidth: '300px',
    display: 'inline-block',
  },
  avatar: {
    backgroundColor: grey[900],
  },
  actionsContainer: {
    flex: true,
  },
  column: {
    flexBasis: '20%',
  },
  orderTotal: {
    textAlign: 'right',
    paddingRight: '20px',
  },
  statusGrid: {
    textAlign: 'center',
  },
};


export default styles;
