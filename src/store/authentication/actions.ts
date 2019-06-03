import { IUser } from '@/interfaces/i-user';

import { getCookie, setCookie } from '@/utils/cookie';

export default {
  authenticate(context: any, { email, password }: { email: string, password: string }) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      email,
      password,
    });
    return fetch('api/v1/authentication', {
      method: 'POST',
      headers,
      body,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        context.commit('setExpires', res.expires);
        context.commit('setToken', res.token);
        context.commit('setLoggedUser', res.user);

        setCookie('expires', res.expires, res.expires);
        setCookie('token', res.token, res.expires);
        setCookie('loggedUser', JSON.stringify(res.user), res.expires);

        return res;
      });
  },
  restore(context: any) {
    return Promise.resolve()
      .then(() => {
        const expires: number = Number(getCookie('expires'));
        const token: string = getCookie('token') || '';
        const loggedUser: IUser = JSON.parse(getCookie('loggedUser') || '{}');

        context.commit('setExpires', expires);
        context.commit('setToken', token);
        context.commit('setLoggedUser', loggedUser);
      });
  },
  logoff(context: any) {
    return Promise.resolve()
      .then(() => {
        setCookie('expires', '', null);
        setCookie('token', '', null);
        setCookie('loggedUser', '', null);

        context.commit('setExpires', null);
        context.commit('setToken', null);
        context.commit('setLoggedUser', null);
      });
  },
};
