import { firebaseApp } from "../../firebaseApp";
import {
  getDatabase,
  ref,
  set,
  get,
  remove,
  Database,
} from "firebase/database";
import { TodoItem } from "../../types/TodoItem";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  ADD_TODO,
  LOADED_TODOS,
  LOAD_TODOS,
  REMOVE_TODO,
} from "../actionTypes";
import { loadedTodos } from "../reducers/todoReducer";

export function* addTodo() {
  yield takeEvery(ADD_TODO, function* (action: any) {
    const todoItem = action.payload;
    const user: { uid: string } = yield select(
      (store) => store.authReducer.user
    );
    yield call(writeUserData, user.uid, todoItem);
  });
}

async function writeUserData(userId: string, todoItem: TodoItem) {
  const db = getDatabase();
  const itemContent = {
    title: todoItem.title,
    content: todoItem.content,
    created: todoItem.created.getTime(),
  };
  await set(ref(db, `users/${userId}/todos/${todoItem.id}`), itemContent);
}

export function* removeTodoSaga() {
  const db = getDatabase();
  yield takeEvery(REMOVE_TODO, function* (action: any) {
    const user: { uid: string } = yield select(
      (store) => store.authReducer.user
    );
    yield call(removeTodoFunction, user.uid, action.payload, db);
  });
}

async function removeTodoFunction(
  userId: string,
  todoId: string,
  db: Database
) {
  await remove(ref(db, `users/${userId}/todos/${todoId}`));
}
