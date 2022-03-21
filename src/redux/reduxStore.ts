import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);
