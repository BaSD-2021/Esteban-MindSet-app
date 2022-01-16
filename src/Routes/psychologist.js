import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';

const psychologistRoutes = [{ name: 'Home', path: '/' }];

const PsychologistRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={psychologistRoutes} logout>
      <Switch>
        <Route path={`${url}/`} render={() => <div>Psychologist Routes</div>} />
      </Switch>
    </Layout>
  );
};

export default PsychologistRoutes;
