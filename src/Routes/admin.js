import { Switch, Redirect, useRouteMatch, Route } from 'react-router-dom';
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
import PsychologistForm from 'Components/Admin/Psychologists/Form';

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
    <Layout routes={adminsRoutes} logout>
      <Switch>
        <Route path={`${url}/admins/list`} component={Admins} />
        <Route path={`${url}/admins/form`} component={AdminsForm} />
        <Route path={`${url}/applications/list`} component={Applications} />
        <Route path={`${url}/applications/form`} component={ApplicationsForm} />
        <Route path={`${url}/clients/list`} component={Clients} />
        <Route path={`${url}/clients/form`} component={ClientsForm} />
        <Route path={`${url}/interviews/list`} component={Interviews} />
        <Route path={`${url}/interviews/form`} component={InterviewsForm} />
        <Route path={`${url}/positions/list`} component={Positions} />
        <Route path={`${url}/positions/form`} component={PositionsForm} />
        <Route path={`${url}/postulants/list`} component={Postulants} />
        <Route path={`${url}/postulants/form`} component={PostulantsForm} />
        <Route path={`${url}/profiles/list`} component={Profiles} />
        <Route path={`${url}/profiles/form`} component={ProfilesForm} />
        <Route path={`${url}/psychologists/list`} component={Psychologists} />
        <Route path={`${url}/psychologists/form`} component={PsychologistForm} />
        <Route path={`${url}/sessions/list`} component={Sessions} />
        <Route path={`${url}/sessions/form`} component={SessionsForm} />
        <Redirect to={`${url}/admins/list`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
