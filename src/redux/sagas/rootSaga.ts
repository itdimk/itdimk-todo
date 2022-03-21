import { getAuth } from 'firebase/auth'
import { firebaseApp } from '../../firebaseApp';

export function* rootSaga() {
  console.log("Saga is ready");

  const auth = getAuth(firebaseApp);
  auth.onAuthStateChanged((state) => {
    console.log('Auth state changed')
  })
}
