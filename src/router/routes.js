
const routes = [
  {
    path: "/",
    name: "default",
    component: () => import("./views/dashboards/default"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/account/login"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("./views/account/register"),
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () => import("./views/calendar/calendar"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("./views/contacts/contactsgrid"),
  },
  {
    path: "/addressAdd",
    name: "AddressAdd",
    component: () => import("./views/account/addressAdd"),
  },
  {
    path: "/profile",
    name: "Profil",
    component: () => import("./views/contacts/profile"),
  },
  {
    path: "/permissionRequests",
    name: "PermissionRequests",
    component: () => import("./views/permissions/permissionRequests"),
  },
  {
    path: "/permission",
    name: "Permission",
    component: () => import("./views/permissions/permission"),
  },
  {
    path: "/requestPermission",
    name: "RequestPermission",
    component: () => import("./views/permissions/requestPermission"),
  },
  {
    path: "/myRequestPermission",
    name: "MyRequestPermission",
    component: () => import("./views/permissions/myRequestPermission"),
  },
  {
    path: "/tasks",
    name: "Task",
    component: () => import("./views/tasks/task-list"),
  },
  {
    path: "/addJob",
    name: "Job",
    component: () => import("./views/dashboards/addJob"),
  },
  {
    path: "/forgotpassword",
    name: "Forgot password",
    component: () => import("./views/account/forgotpassword"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("./views/account/logout"),
  }
];

export default routes;