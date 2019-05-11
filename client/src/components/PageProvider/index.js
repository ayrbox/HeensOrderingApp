import React, {
  createContext,
  useReducer,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import isEmpty from 'lodash/isEmpty';

export const PageContext = createContext();

// page actions that can be triggered by consumers
export const ACTIONS = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETING: 'DELETING',
  DELETED: 'DELETED',
  CLOSE: 'CLOSE',
  SAVING: 'SAVING',
  SAVED: 'SAVED',
  ERROR: 'ERROR',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
};

const initialState = {
  id: undefined,
  requestInProgress: false,
  open: false,
  message: undefined,
  errors: {},
  loading: false,
  data: [],
};

const pageReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD:
      return {
        ...state,
        open: true,
        id: null,
        errors: {},
        message: undefined,
      };
    case ACTIONS.EDIT:
      return {
        ...state,
        open: true,
        id: payload.id,
        errors: {},
        message: undefined,
      };
    case ACTIONS.DELETING:
      return {
        ...state,
        requestInProgress: true,
        errors: {},
        message: undefined,
      };
    case ACTIONS.DELETED:
      return {
        ...state,
        id: null,
        open: false,
        requestInProgress: false,
        loading: false,
        message: payload,
      };
    case ACTIONS.CLOSE:
      return {
        ...state,
        open: false,
      };
    case ACTIONS.SAVING:
      return {
        ...state,
        requestInProgress: true,
      };
    case ACTIONS.SAVED:
      return {
        ...state,
        requestInProgress: false,
        loading: false,
        open: false,
        errors: {},
        message: payload,
        id: null,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        requestInProgress: false,
        loading: false,
        errors: payload,
      };
    case ACTIONS.FETCHING:
      return {
        ...state,
        loading: true,
        errors: {},
      };
    case ACTIONS.FETCHED:
      return {
        ...state,
        loading: false,
        requestInProgress: false,
        errors: {},
        data: payload,
      };
    default:
      return state;
  }
};

const PageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pageReducer, initialState);
  const { errors, message } = state;
  return (
    <PageContext.Provider value={[state, dispatch]}>
      {children}
      {!isEmpty(errors)
        && (
          <Snackbar
            open
            autoHideDuration={5000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            message={<span id="message-id">{JSON.stringify(errors)}</span>}
          />
        )
      }
      { message && (
        <Snackbar
          open
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          message={<span>{message}</span>}
        />
      )}
    </PageContext.Provider>
  );
};

PageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePageState = () => useContext(PageContext);

export default PageProvider;
