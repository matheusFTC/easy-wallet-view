import { IUser } from '@/interfaces/i-user';

export default {
  authenticate(context: any, { referenceCode, password }: { referenceCode: string, password: string }) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      referenceCode,
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
        context.commit('setLoggedEmployee', res.employee);

        localStorage.setItem('expires', res.expires);
        localStorage.setItem('token', res.token);
        localStorage.setItem('loggedEmployee', JSON.stringify(res.employee));
        return res;
      });
  },
  restore(context: any) {
    return Promise.resolve()
      .then(() => {
        const expires: number = Number(localStorage.getItem('expires'));
        const token: string = localStorage.getItem('token') || '';
        const loggedEmployee: IUser = JSON.parse(localStorage.getItem('loggedEmployee') || '{}');

        context.commit('setExpires', expires);
        context.commit('setToken', token);
        context.commit('setLoggedEmployee', loggedEmployee);
      });
  },
  logoff(context: any) {
    return Promise.resolve()
      .then(() => {
        localStorage.setItem('expires', '');
        localStorage.setItem('token', '');
        localStorage.setItem('loggedEmployee', '');

        context.commit('setExpires', null);
        context.commit('setToken', null);
        context.commit('setLoggedEmployee', null);
      });
  },
};
