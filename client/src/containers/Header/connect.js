import { connect } from 'react-redux';
import Header from './header';

const mapState = state => ({
  testState: state.auth,
});

export default connect(mapState)(Header);
