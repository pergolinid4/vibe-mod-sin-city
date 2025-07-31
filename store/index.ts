/**
 * @file store/index.ts
 * @description This file configures and creates the Redux store for the application.
 * It combines all the different reducers (slices) into a single root reducer
 * and exports the configured store, along with types for the root state and dispatch function.
 */

import { configureStore } from '@reduxjs/toolkit';
import storyReducer from './storySlice';
import uiReducer from './uiSlice';
import adaReducer from './adaSlice';
import caseFileReducer from './caseFileSlice';

/**
 * The main Redux store for the application.
 * `configureStore` automatically sets up the Redux DevTools Extension and applies
 * middleware like `redux-thunk` by default.
 */
export const store = configureStore({
  // `reducer` is a map of slice names to their reducer functions.
  reducer: {
    story: storyReducer, // Manages the core story data (characters, objects, etc.)
    ui: uiReducer,       // Manages the UI state (active view, modals, etc.)
    ada: adaReducer,     // Manages the state of the AI assistant (messages, loading state)
    caseFile: caseFileReducer, // Manages the state for the new interactive case file
  },
});

/**
 * `RootState` is a type that represents the entire state of the Redux store.
 * It's inferred automatically from the store itself, so it always stays in sync
 * with the combined reducers.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * `AppDispatch` is a type for the store's dispatch function.
 * This is used to ensure that dispatched actions are correctly typed,
 * which is especially useful when working with async thunks.
 */
export type AppDispatch = typeof store.dispatch;