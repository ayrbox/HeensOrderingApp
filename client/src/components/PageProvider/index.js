import React, {
  createContext,
  useReducer,
  useContext,
} from 'react';
import PropTypes from 'prop-types';

export const PageContext = createContext();

// page actions that can be triggered by consumers
export const ACTIONS = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  CLOSE: 'CLOSE',
  SAVING: 'SAVING',
  SAVED: 'SAVED',
};

const initialState = {
  id: undefined,
  requestInProgress: false,
  open: false,
};

const pageReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD:
      return {
        ...state,
        open: true,
        id: null,
      };
    case ACTIONS.EDIT:
      return {
        ...state,
        open: true,
        id: payload.id,
      };
    case ACTIONS.DELETE:
      return {
        ...state,
        open: false,
        id: payload.id,
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
      }
    case ACTIONS.SAVED:
      return {
        ...state,
        requestInProgress: false,
      }
    default:
      return state;
  }
};

const PageProvider = ({ children }) => (
  <PageContext.Provider value={useReducer(pageReducer, initialState)}>
    {children}
  </PageContext.Provider>
);

PageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePageState = () => useContext(PageContext);

export default PageProvider;
