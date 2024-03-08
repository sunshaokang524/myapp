// router/index

import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const Home = () => import("../pages/home.vue");
const About = () => import("../pages/about.vue");
const Info = () => import("../pages/info.vue");
const My = () => import("../pages/my.vue");
const Login = () => import("../pages/login.vue");
const Main = () => import("../pages/main.vue");
const Edit = () => import("../pages/about/edit.vue");
const OtherInfo = () => import("../pages/info/otherInfo.vue");
const Chat = () => import("../pages/info/chat.vue");
const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Main", component: Main },
  {
    path: "/main",
    name: "main",
    component: Main,
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
        meta: {
          keepAlive: true, // 不缓存该页面
        },
      },
      {
        path: "/about",
        name: "about",
        component: About,
        children: [],
        meta: {
          keepAlive: true, // 不缓存该页面
        },
      },
      {
        path: "/info",
        name: "info",
        component: Info,
        meta: {
          keepAlive: true, // 不缓存该页面
        },
      },
      {
        path: "/my",
        name: "my",
        component: My,
        meta: {
          keepAlive: true, // 不缓存该页面
        },
      },
    ],
  },
  { path: "/login", name: "login", component: Login },
  { path: "/about/edit", name: "edit", component: Edit },
  { path: "/info/otherInfo", name: "otherInfo", component: OtherInfo },
  { path: "/info/chat", name: "Chat", component: Chat },
];
const router = createRouter({
  history: createWebHashHistory("index"),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path == "/login" || to.path == "/user/register") {
    // 登录或者注册才可以往下进行
    next();
  } else {
    // 获取 token
    const token = localStorage.getItem("Token");
    // token 不存在
    if (token === null || token === "") {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
