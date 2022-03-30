// @ts-nocheck
import { firebaseApp } from "../../firebaseApp";
import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import { REGISTER, SET_USER } from "../actionTypes";
import { auth, registerSaga } from "./authSagas";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { setUser } from "../reducers/authReducer";
import { eventChannel } from "redux-saga";

let authChannel: any = null;

function getAuthChannel() {
  if (!authChannel) {
    authChannel = eventChannel((emit) => {
      const unsubscribe = auth.onAuthStateChanged((user) => emit({ user }));
      return unsubscribe;
    });
  }
  return authChannel;
}

function* watchForFirebaseAuth() {
  const channel: any = yield call(getAuthChannel);
  const result : any = yield take(channel);
  console.log(result.user)
  yield put(setUser(result.user))
}

export function* rootSaga() {
  yield all([fork(registerSaga), fork(watchForFirebaseAuth)]);
}
