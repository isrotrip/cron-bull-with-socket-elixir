import Vue from 'vue';
import VueRouter from 'vue-router';
import serverAPI from '@/apis/server';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      title: 'Dashboard',
      authenticate: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      title: 'Login',
      authenticate: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
    meta: {
      title: 'Register',
      authenticate: false,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some((record) => record.meta.authenticate)) {
    if (!token) {
      next({
        path: '/login',
      });
    } else {
      store.commit('START_LOADING');

      serverAPI
        .post('/users/authenticate',
          {}, {
            headers: {
              token,
            },
          })
        .then(({ data }) => {
          const { username, premium } = data;

          store.commit('SWITCH_LOGIN', {
            username,
            premium,
          });
          if (!to.path === '/') {
            next({
              path: '/',
            });
          } else {
            next();
          }
        })
        .catch(() => {
          next({
            path: '/login',
          });
        })
        .finally(() => {
          store.commit('FINISH_LOADING');
        });
    }
  } else if (to.matched.some((record) => !record.meta.authenticate) && token) {
    store.commit('START_LOADING');

    serverAPI
      .post('/users/authenticate',
        {}, {
          headers: {
            token,
          },
        })
      .then(({ data }) => {
        const { username, premium } = data;

        store.commit('SWITCH_LOGIN', {
          username,
          premium,
        });

        next({
          path: '/',
        });
      })
      .catch(() => {
        next({
          path: '/login',
        });
      })
      .finally(() => {
        store.commit('FINISH_LOADING');
      });
  } else {
    next();
  }
});

export default router;
