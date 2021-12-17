import { Switch, Route, Redirect } from 'react-router-dom';
import Admins from 'Components/Admin/Admins/index';
import AdminsForm from 'Components/Admin/Admins/Form';
import Applications from 'Components/Admin/Applications/index';
import ApplicationsForm from 'Components/Admin/Applications/Form';
import Clients from 'Components/Admin/Clients/index';
import ClientsForm from 'Components/Admin/Clients/Form';
import Interviews from 'Components/Admin/Interviews/index';
import InterviewsForm from 'Components/Admin/Interviews/Form';
import Positions from 'Components/Admin/Positions/index';
import PositionsForm from 'Components/Admin/Positions/Form';
import Postulants from 'Components/Admin/Postulants/index';
import PostulantsForm from 'Components/Admin/Postulants/Form';
import Profiles from 'Components/Admin/Profiles/index';
import ProfilesForm from 'Components/Admin/Profiles/Form';
import Psychologists from 'Components/Admin/Psychologists/index';
import Sessions from 'Components/Admin/Sessions/index';
import SessionsForm from 'Components/Admin/Sessions/Form';
import Layout from 'Components/Layout';

const AdminRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/admins/list" component={Admins} />
        <Route path="/admins/Form" component={AdminsForm} />
        <Route path="/applications/list" component={Applications} />
        <Route path="/applications/Form" component={ApplicationsForm} />
        <Route path="/clients/list" component={Clients} />
        <Route path="/clients/Form" component={ClientsForm} />
        <Route path="/interviews/list" component={Interviews} />
        <Route path="/interviews/Form" component={InterviewsForm} />
        <Route path="/positions/list" component={Positions} />
        <Route path="/positions/Form" component={PositionsForm} />
        <Route path="/postulants/list" component={Postulants} />
        <Route path="/postulants/Form" component={PostulantsForm} />
        <Route path="/profiles/list" component={Profiles} />
        <Route path="/profiles/Form" component={ProfilesForm} />
        <Route path="/psychologists" component={Psychologists} />
        <Route path="/sessions/list" component={Sessions} />
        <Route path="/sessions/Form" component={SessionsForm} />
        <Redirect to="/admins/list" />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
