import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import MainPage from 'Components/MainPage/MainPage';
import Layout from 'Components/Layout';
import OpenPositions from 'Components/MainPage/OpenPositions';
import PositionDetailed from 'Components/MainPage/PositionDetailed';
import Contact from 'Components/MainPage/Contact';

const homeRoutes = [
  { name: 'Open Positions', path: '/home/positions' },
  { name: 'Are you a company?', path: '/home/contact' },
  { name: 'Sign Up', path: '/auth/signup' },
  { name: 'Log In', path: '/auth/login' }
];

const MainHomeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={homeRoutes}>
      <Switch>
        <Route exact path={`${url}/`} component={MainPage} />
        <Route exact path={`${url}/positions`} component={OpenPositions} />
        <Route path={`${url}/position/`} component={PositionDetailed} />
        <Route path={`${url}/contact`} component={Contact} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default MainHomeRoutes;
