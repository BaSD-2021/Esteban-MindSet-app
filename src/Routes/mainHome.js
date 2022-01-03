import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import MainPage from 'Components/MainPage/MainPage';
import Layout from 'Components/Layout';
import OpenPositions from 'Components/MainPage/OpenPositions';
import PositionDetailed from 'Components/MainPage/PositionDetailed';
import LogIn from 'Components/MainPage/LogIn';

const homeRoutes = [
  { name: 'Open Positions', path: '/home/positions' },
  { name: 'Are you a company?', path: '/home/contact' },
  { name: 'Sign Up', path: '/home/signup' },
  { name: 'Log In', path: '/home/login' }
];

const MainHomeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={homeRoutes}>
      <Switch>
        <Route exact path={`${url}`} component={MainPage} />
        <Route exact path={`${url}/positions`} component={OpenPositions} />
        <Route path={`${url}/position/`} component={PositionDetailed} />
        <Route path={`${url}/login`} component={LogIn} />
        <Redirect to={`${url}`} />
      </Switch>
    </Layout>
  );
};

export default MainHomeRoutes;
