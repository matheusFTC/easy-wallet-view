import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/views/dashboard/dashboard';
import Login from '@/views/login/login';
import Register from '@/views/register/register';
import UserList from '@/components/business/user-list/user-list';
import UserCreateUpdate from '@/components/business/user-create-update/user-create-update';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          name: 'user-list',
          path: 'user-list',
          component: UserList,
        },
        {
          name: 'user-create',
          path: 'user-create',
          component: UserCreateUpdate,
        },
        {
          name: 'user-update',
          path: 'user-update/:_id',
          component: UserCreateUpdate,
        },
      ],
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
});
