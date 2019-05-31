import { IUser } from '@/interfaces/i-user';

import fetch from '@/utils/fetch';

export default {
  fetchUsers(context: any) {
    return fetch('api/v1/users')
      .then((res) => {
        context.commit('setUsers', res);
      });
  },
  fetchUser(context: any, { _id }: { _id: string }) {
    return fetch(`api/v1/users/${_id}`)
      .then((res) => {
        context.commit('setUser', res);
      });
  },
  insertUser(context: any, { user }: { user: IUser }) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify(user);

    return fetch('api/v1/users', {
      method: 'POST',
      headers,
      body,
    });
  },
  updateUser(context: any, { user }: { user: IUser }) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify(user);

    return fetch(`api/v1/users/${user._id}`, {
      method: 'PUT',
      headers,
      body,
    });
  },
  deleteUser(context: any, { _id }: { _id: string }) {
    return fetch(`api/v1/users/${_id}`, {
      method: 'DELETE',
    });
  },
};
