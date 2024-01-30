// router/index

import { createRouter, createWebHashHistory , RouteRecordRaw } from "vue-router";
const Home = () => import("../pages/home.vue");
const About = () => import("../pages/about.vue");
const Info = () => import("../pages/info.vue");
const My = () => import("../pages/My.vue");
const Login = () => import("../pages/login.vue");
const Main = () => import("../pages/main.vue");
const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "/", component: Main },
  { path: "/main", name: "main", component: Main,children:[{ path: "/home", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
  { path: "/info", name: "info", component: Info },
  { path: "/my", name: "my", component: My },
  { path: "/login", name: "login", component: Login },]},
  
];
const router = createRouter({
  history: createWebHashHistory('index'),
  routes,
});

export default router;
