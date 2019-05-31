import { IUser } from '@/interfaces/i-user';

export default {
  expires: (state: { expires: number }) => {
    return state.expires;
  },
  token: (state: { token: string }) => {
    return state.token;
  },
  loggedEmployee: (state: { loggedEmployee: IUser }) => {
    return state.loggedEmployee;
  },
};
