import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import cityApi from './api/cityApi';
import './App.css';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import LoginPage from './features/auth/pages/LoginPage';
// import studentApi from 'api/studentApi';

function App() {
  useEffect(() => {
    cityApi.getAll().then((response) => console.log(response));
  }, []);

  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>;

      <PrivateRoute path="/admin">
        <AdminLayout />
      </PrivateRoute>;

      {/* PAGE NOT FOUND */}
      <Route>
        <NotFound />
      </Route>;
    </Switch>
  );
}

export default App;
