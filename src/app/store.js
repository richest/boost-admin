// import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
// import createSagaMiddleware from 'redux-saga'
// import rootReducer from './rootSaga'
// import rootSaga from './rootSaga';

// export default function configureAppStore(preloadedState) {

//   const sagaMiddleware = createSagaMiddleware();
//   const store = configureStore({
//     reducer: rootReducer,
//     middleware: [...getDefaultMiddleware(), sagaMiddleware],
//     preloadedState,
//   })
//   sagaMiddleware.run(rootSaga)

//   if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('app/rootReducers', () => store.replaceReducer(rootReducer))
//   }
//   return store
// }

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer"; // Ensure this points to the correct file
import rootSaga from "./rootSaga";

// Define your custom middleware array
const customMiddleware = [
  createSagaMiddleware(),
  // Add any additional middleware here if needed
];

export default function configureAppStore(preloadedState) {
  // Create the saga middleware instance
  const sagaMiddleware = customMiddleware[0];

  const store = configureStore({
    reducer: rootReducer,
    middleware: customMiddleware,
    preloadedState,
  });

  // Run the root saga
  sagaMiddleware.run(rootSaga);

  // Setup hot module replacement for reducers if in development mode
  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./rootReducer", () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
