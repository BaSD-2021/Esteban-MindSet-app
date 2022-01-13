import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Psychologist/Home';
import Layout from 'Components/Layout';
import Profile from 'Components/Psychologist/Profile';

const PsychologistRoutes = [
  { name: 'Home', path: '/psychologist' },
  { name: 'Profile', path: '/psychologist/profile' }
];

const PsychologistsRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={PsychologistRoutes}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route path={`${url}/profile`} component={Profile} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default PsychologistsRoutes;