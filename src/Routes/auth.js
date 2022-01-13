import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from 'Components/Auth/Login';
import Layout from 'Components/Layout';
import NotAllowed from 'Components/Auth/NotAllowed';
import SignUp from 'Components/Auth/SignUp';

const authRoutes = [{ name: 'Login', path: '/auth/login' }];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={authRoutes}>
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Route path={`${url}/signup`} component={SignUp} />
        <Route path={`${url}/notAllowed`} component={NotAllowed} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
