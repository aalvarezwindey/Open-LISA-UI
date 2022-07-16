import React, { createContext, useReducer } from 'react';
import { INITIAL_STATE } from './constants';
import { reducer } from './reducer';

export const AppContext = createContext();

export const AppProvider = ({ children }) => (
  <AppContext.Provider value={useReducer(reducer, INITIAL_STATE)}>{children}</AppContext.Provider>
);
