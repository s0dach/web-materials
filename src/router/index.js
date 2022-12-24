import Lections from "../components/";
import Login from "../components/Login/Login";

export const privateRoute = [
  { path: "/", component: Lections, exact: true },
  { path: "/lists/:id", component: Lections, exact: true },
];

export const publicRoute = [{ path: "/login", component: Login, exact: true }];
