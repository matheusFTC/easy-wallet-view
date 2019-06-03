import { IUser } from '@/interfaces/i-user';

export default {
  expires: (state: { expires: number }) => {
    return state.expires;
  },
  token: (state: { token: string }) => {
    return state.token;
  },
  loggedUser: (state: { loggedUser: IUser }) => {
    return state.loggedUser;
  },
};
