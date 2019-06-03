import { IUser } from '@/interfaces/i-user';

export default {
  setExpires(state: { expires: number }, expires: number) {
    state.expires = expires;
  },
  setToken(state: { token: string }, token: string) {
    state.token = token;
  },
  setLoggedUser(state: { loggedUser: IUser }, loggedUser: IUser) {
    state.loggedUser = loggedUser;
  },
};
