import Vue from "vue";
import Router from "vue-router";
import login from "components/login/login";
import home from "components/home/home";
import category from "components/category/category";
import userinfo from "components/userinfo/userinfo";
import store from "common/js/store.js";
import common from "../common/js/common";

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {
        auth: false
      }
    },
    {
      path: "/home",
      name: "home",
      component: home,
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    {
      path: "/category",
      name: "category",
      component: category,
      meta: {
        auth: true,
        keepAlive: true
      }
    },
    {
      path: "/userinfo",
      name: "userinfo",
      component: userinfo,
      meta: {
        auth: true,
        keepAlive: false
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) { // 判断是否需要校验
    // 不使用store.state.isLogin进行判断,使用localStorege.user进行判断
    console.log(common.user.getUser())
    if (common.user.getUser()) { // 已经登陆
      next(); // 正常跳转到你设置好的页面
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
