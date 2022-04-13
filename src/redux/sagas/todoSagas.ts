import { firebaseApp } from "../../firebaseApp";
import { getDatabase, ref, set } from "firebase/database";
import { TodoItem } from "../../types/TodoItem";
import { call, select, takeEvery } from "redux-saga/effects";
import { ADD_TODO } from "../actionTypes";

export function* addTodo() {
  yield takeEvery(ADD_TODO, function* (action: any) {
    const todoItem = action.payload;
    const user: { uid: string } = yield select(
      (store) => store.authReducer.user
    );
    console.log(user);
    yield call(writeUserData, user.uid, todoItem);
  });
}

async function writeUserData(userId: string, todoItem: TodoItem) {
  const db = getDatabase();
  await set(ref(db, `users/${userId}/todos/`), todoItem);
}
