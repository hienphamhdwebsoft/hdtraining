import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import LoginPage from './features/auth/pages/LoginPage';

function App() {
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
    </Switch >
  );
}

export default App;
