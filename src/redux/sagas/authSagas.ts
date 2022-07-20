import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { call, put, take, takeEvery } from "redux-saga/effects";
import { firebaseApp } from "../../firebaseApp";
import { LOGIN, LOGOUT, REGISTER, RESET_PASSWORD } from "../actionTypes";
import { SignInData } from "../../types/SignInData";
import { channel, eventChannel } from "redux-saga";
import { setError, setLoading } from "../reducers/authReducer";

export const auth = getAuth(firebaseApp);

export function* registerSaga() {
  yield takeEvery(REGISTER, function* (action: any) {
    const signInData = (action as any).payload as SignInData;
    try {
      yield call(
        createUserWithEmailAndPassword,
        auth,
        signInData.email,
        signInData.password
      );
    } catch (e: any) {
      yield put(setError(e.toString()));
    }
  });
}

export function* logoutSaga() {
  yield takeEvery(LOGOUT, function* () {
    yield call(signOut, auth);
  });
}

export function* loginSaga() {
  yield takeEvery(LOGIN, function* (action: any) {
    const signInData = (action as any).payload as SignInData;
    yield put(setError(""));
    yield put(setLoading(true));

    try {
      yield call(
        signInWithEmailAndPassword,
        auth,
        signInData.email,
        signInData.password
      );
    } catch {
      yield put(setError("Username or password is incorrect"));
    }

    yield put(setLoading(false));
  });
}

export function* resetPassSaga() {
  yield takeEvery(RESET_PASSWORD, function* (action: any) {
    yield put(setError(""));
    yield put(setLoading(true));

    try {
      yield call(sendPasswordResetEmail, auth, action.payload);
    } catch {
      yield put(setError("Account with this email is not registered"));
    }

    yield put(setLoading(false));
  });
}
