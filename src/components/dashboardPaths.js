import DashboardPage from './Dashboard/Dashboard';
import AdminPage from './Admin/Admin';
import RolePage from './Role/Role';

import {
  Dashboard,
  Person,
  Star
} from "@material-ui/icons";

const paths = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/admin",
    sidebarName: "Admin",
    navbarName: "Admin",
    icon: Person,
    component: AdminPage
  },
  {
    path: "/role",
    sidebarName: "Role",
    navbarName: "Role",
    icon: Star,
    component: RolePage
  },
  { redirect: true, path: "/", to: "/admin", navbarName: "Redirect" }
];

export default paths;
