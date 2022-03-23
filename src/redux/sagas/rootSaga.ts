import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebaseApp";
import { all, fork, takeEvery } from "redux-saga/effects";
import { REGISTER } from "../actionTypes";

function* registerSaga() {
  yield takeEvery(REGISTER, (action) => {
    console.log("REGISTER ACTION catched by saga");
  });
}

export function* rootSaga() {
  const auth = getAuth(firebaseApp);
  auth.onAuthStateChanged((state) => {
    console.log("Auth state changed");
  });

  yield all([fork(registerSaga)]);

  console.log("Saga is ready");
}
