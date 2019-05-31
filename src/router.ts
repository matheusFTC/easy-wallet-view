import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/views/dashboard/dashboard';
import Login from '@/views/login/login';
import UserList from '@/components/business/user-list/user-list';
import UserCreateUpdate from '@/components/business/user-create-update/user-create-update';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      redirect: 'order-list',
      children: [
        {
          name: 'employee-list',
          path: 'employee-list',
          component: UserList,
        },
        {
          name: 'employee-create',
          path: 'employee-create',
          component: UserCreateUpdate,
        },
        {
          name: 'employee-update',
          path: 'employee-update/:_id',
          component: UserCreateUpdate,
        },
      ],
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
  ],
});
