import Header from "../components/Header/Header";
import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

const Basket = lazy(() => import('pages/Basket'));
const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));

const routerPaths = [
  {
    path: '/',
    name: 'home',
    component: Home,
    exact: true,
    props: {},
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    exact: false,
    props: {},
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    exact: false,
    props: {},
  },
  {
    path: '/basket',
    name: 'basket',
    component: Basket,
    exact: false,
    props: {},
  },
];

const renderHeaderComponent = () => {
  const { pathname } = window.location;
  const condition = ['/login', '/register'];
  const isUserIn = condition.includes(pathname);

  return !isUserIn ? <Header /> : null;
};

const Routes = (
  <BrowserRouter>
    {renderHeaderComponent()}

    <Switch>
      <Suspense fallback={<div>Loading...</div>}>
        {routerPaths.map(({ path, name, component, props }) => (
          <ProtectedRoute
            key={name}
            exact
            path={path}
            component={component}
            props={props}
          />
        ))}
      </Suspense>
    </Switch>
  </BrowserRouter>
);

export default Routes;
