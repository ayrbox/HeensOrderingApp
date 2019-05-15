import red from '@material-ui/core/colors/red';
import baseStyles from '../../assets/jss/baseStyles';

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
    backgroundColor: red[500],
  },
  actionsContainer: {
    flex: true,
  },
};


export default styles;
