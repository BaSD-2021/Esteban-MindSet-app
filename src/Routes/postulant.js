import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Postulant/Home';
import Layout from 'Components/Layout';

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={[{ name: 'Go to admin app', path: '/admin' }]}>
      <Switch>
        <Route path={`${url}/`} component={Home} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
