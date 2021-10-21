import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { cityActions } from '../city/citySlice';
import AddEditStudent from './pages/AddEditStudent';
import ListPage from './pages/ListPage';

export default function Student() {
    const match = useRouteMatch();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(cityActions.fetchCityList())
    }, [dispatch])
    return (
        <Switch>
            <Route path={match.path} exact>
                <ListPage />
            </Route>
            <Route path={`${match.path}/add`} >
                <AddEditStudent />
            </Route>
            <Route path={`${match.path}/:studentId`} >
                <AddEditStudent />
            </Route>
        </Switch>
    );
}
