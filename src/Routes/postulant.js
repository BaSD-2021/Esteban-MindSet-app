import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Postulant/Home';
import Layout from 'Components/Layout';
import Applications from 'Components/Postulant/Applications';
import Interviews from 'Components/Postulant/Interviews';
import Positions from 'Components/Postulant/Positions';
import Sessions from 'Components/Postulant/Sessions';
import Profile from 'Components/Postulant/Profile';
import SignUp from 'Components/Postulant/SignUp';

const postulantRoutes = [
  { name: 'Home', path: '/postulant' },
  { name: 'Applications', path: '/postulant/applications' },
  { name: 'Interviews', path: '/postulant/interviews' },
  { name: 'Positions', path: '/postulant/positions' },
  { name: 'Profile', path: '/postulant/profile' },
  { name: 'Sessions', path: '/postulant/sessions' },
  { name: 'Sign Up', path: '/postulant/signup' }
];

const PostulantsRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={postulantRoutes}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route path={`${url}/applications`} component={Applications} />
        <Route path={`${url}/interviews`} component={Interviews} />
        <Route path={`${url}/positions`} component={Positions} />
        <Route path={`${url}/sessions`} component={Sessions} />
        <Route path={`${url}/profile`} component={Profile} />
        <Route path={`${url}/signup`} component={SignUp} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default PostulantsRoutes;
