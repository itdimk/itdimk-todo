// @ts-nockeck
import { firebaseApp } from "../../firebaseApp";
import { getDatabase, ref, set, get, onValue } from "firebase/database";
import { all, call, fork, put, select, take, takeEvery } from "redux-saga/effects";
import { REGISTER, SET_USER } from "../actionTypes";
import {
  auth,
  loginSaga,
  logoutSaga,
  registerSaga,
  resetPassSaga,
} from "./authSagas";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { setUser } from "../reducers/authReducer";
import { EventChannel, eventChannel } from "redux-saga";
import { addTodo, loadTodos } from "./todoSagas";

let authChannel: any = null;
let dataChangingChannel: any = null;

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
  while (true) {
    const channel: unknown = yield call(getAuthChannel);
    const result: unknown = yield take(channel as any);
    yield put(setUser((result as any).user));

    if (dataChangingChannel) {
      yield dataChangingChannel.close();
      dataChangingChannel = null;
    }
    yield fork(watchForDataChanging);
  }
}

function* getDataChangingChannel() {
  if (!dataChangingChannel) {
    dataChangingChannel = eventChannel((emit) => {
      const db = getDatabase();
      console.log(auth.currentUser);
      const todosRef = ref(db, `users/${auth.currentUser?.uid}/todos`);
      const unsubscribe = onValue(todosRef, (snapshot) => {
        if (!snapshot.val()) return;
        const data = snapshot.val();
        emit(
          Object.keys(data).map((k) => ({
            id: k,
            title: data[k].title as string,
            content: data[k].content as string,
          }))
        );
      });
      return unsubscribe;
    });
  }
  return dataChangingChannel;
}

function* watchForDataChanging() {
  while (true) {
    const channel: unknown = yield call(getDataChangingChannel);
    const result: unknown = yield take(channel as any);
    console.log(result);
  }
}

export function* rootSaga() {
  yield all([
    fork(registerSaga),
    fork(watchForFirebaseAuth),
    fork(logoutSaga),
    fork(loginSaga),
    fork(resetPassSaga),
    fork(addTodo),
    fork(loadTodos),
  ]);
}
