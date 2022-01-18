import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Psychologist/Home';
import Layout from 'Components/Layout';
import Profile from 'Components/Psychologist/Profile';
import Sessions from 'Components/Psychologist/Sessions';
import sessionsForm from 'Components/Psychologist/Sessions/Form';

const PsychologistRoutes = [
  { name: 'Home', path: '/psychologist' },
  { name: 'Profile', path: '/psychologist/profile' },
  {
    name: 'Sessions',
    path: '/psychologist/sessions'
  }
];

const PsychologistsRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={PsychologistRoutes}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route path={`${url}/profile`} component={Profile} />
        <Route exact path={`${url}/sessions`} component={Sessions} />
        <Route path={`${url}/sessions/form`} component={sessionsForm} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default PsychologistsRoutes;
