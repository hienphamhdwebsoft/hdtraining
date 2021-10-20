import { all, takeLatest, call, put } from '@redux-saga/core/effects';
import cityApi from '../../api/cityApi';
import studentApi from '../../api/studentApi';
import { City, ListResponse, Student } from '../../models';
import { dashboardActions, RankingByCity } from './DashboardSlice';

function* fecthStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);

  const statistics = responseList.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statistics;
  yield put(
    dashboardActions.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount })
  );
}

function* fecthHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });

  //   Dispatch -> reducer
  yield put(dashboardActions.setHighestStudentlist(data));
}

function* fecthLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });

  yield put(dashboardActions.setLowestStudentList(data));
}

function* fecthRankingByCityList() {
  // Fetch city list
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);
  // Fetch ranking by city
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      city: x.code,
    })
  );
  const responseList: Array<ListResponse<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => ({
    cityId: cityList[idx].code,
    // cityName:
    rankingList: x.data,
  }));
  // Update state
  yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fecthDashboardData() {
  try {
    yield all([
      call(fecthStatistics),
      call(fecthHighestStudentList),
      call(fecthLowestStudentList),
      call(fecthRankingByCityList),
    ]);

    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('Error to fetch dasboard data: ', error);
    yield put(dashboardActions.fetchDataFailed());
  }
}

export default function* dasboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fecthDashboardData);
}
