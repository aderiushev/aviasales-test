import Dashboard from './containers/dashboard';

const routes = [
  {
    path: '/dashboard/:period(today|yesterday|last_hour|last_3_days)',
    component: Dashboard,
    text: 'Dashboard',
  },
];

export default routes;
