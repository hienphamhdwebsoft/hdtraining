import { PayloadAction } from '@reduxjs/toolkit';
import { authActions, LoginPayload } from './authSlice';
import { take, fork, call, put, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';

function* handleLogin(payload: LoginPayload) {
  try {
    delay(1000);
    localStorage.setItem('access_token', 'fake_token');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Hien Pham',
      })
    );

    // redirect to admin page
    yield put(push('/admin/dashboard'));
  } catch (error) {
    // yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  localStorage.removeItem('access_token');
  // redirect to login page
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token')); //  Check access_token

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type); //  Wait user dispach action
      yield fork(handleLogin, action.payload); // Excute handleLogin
    }

    yield take(authActions.logout.type); //  Wait user dispach action
    yield call(handleLogout); // Excute handleLogout
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
