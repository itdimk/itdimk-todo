import { firebaseApp } from "../../firebaseApp";
import { getDatabase, ref, set, get } from "firebase/database";
import { TodoItem } from "../../types/TodoItem";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { ADD_TODO, LOADED_TODOS, LOAD_TODOS } from "../actionTypes";
import { loadedTodos } from "../reducers/todoReducer";

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

export function* loadTodos() {
  yield takeEvery(LOAD_TODOS, function* (action: any) {
    const user: { uid: string } = yield select(
      (store) => store.authReducer.user
    );
    const todos: TodoItem[] = yield call(loadTodosFunction, user.uid);
    yield put(loadedTodos(todos));
  });
}

async function writeUserData(userId: string, todoItem: TodoItem) {
  const db = getDatabase();
  const { id, ...itemContent } = todoItem;
  await set(ref(db, `users/${userId}/todos/${id}`), itemContent);
}

async function loadTodosFunction(userId: string) {
  const db = getDatabase();
  const result = await get(ref(db, `users/${userId}/todos`));
  console.log(result);
  return result;
}
