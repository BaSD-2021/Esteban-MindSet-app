import { Switch, Route, Redirect } from 'react-router-dom';
import Admins from 'Components/Admins/index';
import AdminsForm from 'Components/Admins/Form';
import Applications from 'Components/Applications/index';
import ApplicationsForm from 'Components/Applications/Form';
import Clients from 'Components/Clients/index';
import ClientsForm from 'Components/Clients/Form';
import Interviews from 'Components/Interviews/index';
import InterviewsForm from 'Components/Interviews/Form';
import Positions from 'Components/Positions/index';
import PositionsForm from 'Components/Positions/Form';
import Postulants from 'Components/Postulants/index';
import PostulantsForm from 'Components/Postulants/Form';
import Profiles from 'Components/Profiles/index';
import ProfilesForm from 'Components/Profiles/Form';
import Psychologists from 'Components/Psychologists/index';
import Sessions from 'Components/Sessions/index';
import SessionsForm from 'Components/Sessions/Form';
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
