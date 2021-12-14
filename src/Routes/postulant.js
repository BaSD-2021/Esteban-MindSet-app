import { Switch, Route } from 'react-router-dom';
import Home from 'Components/Home';
import Layout from 'Components/Layout';

const AdminRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
