import Admins from './Components/Admins/index';
import AdminsForm from './Components/Admins/Form';
import Applications from './Components/Applications/index';
import ApplicationsForm from './Components/Applications/Form';
import Clients from './Components/Clients/index';
import ClientsForm from './Components/Clients/Form';
import Interviews from './Components/Interviews/index';
import InterviewsForm from './Components/Interviews/Form';
import Positions from './Components/Positions/index';
import PositionsForm from './Components/Positions/Form';
import Postulants from './Components/Postulants/index';
import PostulantsForm from './Components/Postulants/Form';
import Profiles from './Components/Profiles/index';
import ProfilesForm from './Components/Profiles/Form';
import Psychologists from './Components/Psychologists/index';
import Sessions from './Components/Sessions/index';
import SessionsForm from './Components/Sessions/Form';
import Home from './Components/Home/index';
import Layout from './Components/Layout';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Admins" exact component={Admins} />
          <Route path="/Admins/Form" component={AdminsForm} />
          <Route path="/Applications" exact component={Applications} />
          <Route path="/Applications/Form" component={ApplicationsForm} />
          <Route path="/Clients" exact component={Clients} />
          <Route path="/Clients/Form" component={ClientsForm} />
          <Route path="/Interviews" exact component={Interviews} />
          <Route path="/Interviews/Form" component={InterviewsForm} />
          <Route path="/Positions" exact component={Positions} />
          <Route path="/Positions/Form" component={PositionsForm} />
          <Route path="/Postulants" exact component={Postulants} />
          <Route path="/Postulants/Form" component={PostulantsForm} />
          <Route path="/Profiles" exact component={Profiles} />
          <Route path="/Profiles/Form" component={ProfilesForm} />
          <Route path="/Psychologists" component={Psychologists} />
          <Route path="/Sessions" exact component={Sessions} />
          <Route path="/Sessions/Form" component={SessionsForm} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routes;
