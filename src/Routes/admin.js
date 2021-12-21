import { Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Admins from 'Components/Admin/Admins';
import AdminsForm from 'Components/Admin/Admins/Form';
import Applications from 'Components/Admin/Applications';
import ApplicationsForm from 'Components/Admin/Applications/Form';
import Clients from 'Components/Admin/Clients';
import ClientsForm from 'Components/Admin/Clients/Form';
import Interviews from 'Components/Admin/Interviews';
import InterviewsForm from 'Components/Admin/Interviews/Form';
import Positions from 'Components/Admin/Positions';
import PositionsForm from 'Components/Admin/Positions/Form';
import Postulants from 'Components/Admin/Postulants';
import PostulantsForm from 'Components/Admin/Postulants/Form';
import Profiles from 'Components/Admin/Profiles';
import ProfilesForm from 'Components/Admin/Profiles/Form';
import Psychologists from 'Components/Admin/Psychologists';
import Sessions from 'Components/Admin/Sessions';
import SessionsForm from 'Components/Admin/Sessions/Form';
import Layout from 'Components/Layout';
import PrivateRoute from 'Routes/PrivateRoute';

const adminsRoutes = [
  { name: 'Admins', path: '/admin/admins/list' },
  { name: 'Applications', path: '/admin/applications/list' },
  { name: 'clients', path: '/admin/clients/list' },
  { name: 'interviews', path: '/admin/interviews/list' },
  { name: 'positions', path: '/admin/positions/list' },
  { name: 'postulants', path: '/admin/postulants/list' },
  { name: 'profiles', path: '/admin/profiles/list' },
  { name: 'psychologists', path: '/admin/psychologists/list' },
  { name: 'sessions', path: '/admin/sessions/list' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={adminsRoutes}>
      <Switch>
        <PrivateRoute path={`${url}/admins/list`} component={Admins} />
        <PrivateRoute path={`${url}/admins/form`} component={AdminsForm} />
        <PrivateRoute path={`${url}/applications/list`} component={Applications} />
        <PrivateRoute path={`${url}/applications/form`} component={ApplicationsForm} />
        <PrivateRoute path={`${url}/clients/list`} component={Clients} />
        <PrivateRoute path={`${url}/clients/form`} component={ClientsForm} />
        <PrivateRoute path={`${url}/interviews/list`} component={Interviews} />
        <PrivateRoute path={`${url}/interviews/form`} component={InterviewsForm} />
        <PrivateRoute path={`${url}/positions/list`} component={Positions} />
        <PrivateRoute path={`${url}/positions/form`} component={PositionsForm} />
        <PrivateRoute path={`${url}/postulants/list`} component={Postulants} />
        <PrivateRoute path={`${url}/postulants/form`} component={PostulantsForm} />
        <PrivateRoute path={`${url}/profiles/list`} component={Profiles} />
        <PrivateRoute path={`${url}/profiles/form`} component={ProfilesForm} />
        <PrivateRoute path={`${url}/psychologists`} component={Psychologists} />
        <PrivateRoute path={`${url}/sessions/list`} component={Sessions} />
        <PrivateRoute path={`${url}/sessions/form`} component={SessionsForm} />
        <Redirect to={`${url}/admins/list`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
