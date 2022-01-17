import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import Sessions from 'Components/Psychologist/Sessions';
import sessionsForm from 'Components/Psychologist/Sessions/Form';

const psychologistRoutes = [
  { name: 'Home', path: '/' },
  {
    name: 'Sessions',
    path: 'psychologist/sessions'
  }
];

const PsychologistRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={psychologistRoutes} logout>
      <Switch>
        <Route exact path={`${url}/`} render={() => <div>Psychologist Routes</div>} />
        <Route exact path={`${url}/sessions`} component={Sessions} />
        <Route path={`${url}/sessions/form`} component={sessionsForm} />
      </Switch>
    </Layout>
  );
};

export default PsychologistRoutes;
