import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { call, take, takeEvery } from "redux-saga/effects";
import { firebaseApp } from "../../firebaseApp";
import { REGISTER } from "../actionTypes";
import { SignInData } from "../../types/SignInData";
import { channel, eventChannel } from "redux-saga";

export const auth = getAuth(firebaseApp);

function* register(action: any) {

  const signInData = (action as any).payload as SignInData;
  yield call(
    createUserWithEmailAndPassword,
    auth,
    signInData.email,
    signInData.password
  );
}

export function* registerSaga() {
  yield takeEvery(REGISTER, register);
}
