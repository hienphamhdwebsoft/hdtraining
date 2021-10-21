import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import { citySaga } from '../features/city/citySaga';
import dasboardSaga from '../features/dashboard/DashboardSaga';
import studentSaga from '../features/student/studentSaga';

export default function* rootSaga() {
  yield all([authSaga(), dasboardSaga(), studentSaga(), citySaga()]);
}
