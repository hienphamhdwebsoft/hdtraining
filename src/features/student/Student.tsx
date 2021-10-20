import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditStudent from './pages/AddEditStudent';
import ListStudent from './pages/ListStudent';

export default function Student() {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={match.path} exact>
                <ListStudent />
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
