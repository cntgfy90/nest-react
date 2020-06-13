import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Header from './components/Header';
import Loader from './components/Loader';
import withAuth from './hoc/withAuth';
import { LOCAL_STORAGE_AUTH } from './constants';
import store from './store';
import { AUTH_ACTION_TYPES } from './actions/auth';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contacts = React.lazy(() => import('./pages/Contacts'));
const Posts = React.lazy(() => import('./pages/Posts'));

function App(): JSX.Element {
  function handleLogout() {
    localStorage.removeItem(LOCAL_STORAGE_AUTH);
    store.dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
  }

  return (
    <Router>
      <React.Suspense fallback={Loader}>
        <Switch>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <>
            <Header handleLogout={handleLogout} />
            <Route path="/" component={withAuth(Home)} exact />
            <Route path="/about" component={withAuth(About)} exact />
            <Route path="/contacts" component={withAuth(Contacts)} exact />
            <Route path="/posts" component={withAuth(Posts)} exact />
            <Route render={() => <Redirect to="/" />} />
          </>
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
