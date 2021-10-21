import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, debounce } from 'redux-saga/effects';
import studentApi from '../../api/studentApi';
import { ListParams, ListResponse, Student } from '../../models';
import { studentActions } from './studentSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

function* handleSeacrhDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);
  yield debounce(500, studentActions.setFilterDebounce.type, handleSeacrhDebounce);
}
