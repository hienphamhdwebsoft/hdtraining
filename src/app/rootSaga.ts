import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import dasboardSaga from '../features/dashboard/DashboardSaga';

export default function* rootSaga() {
  yield all([authSaga(), dasboardSaga()]);
}
