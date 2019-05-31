import { IUser } from '@/interfaces/i-user';

export default {
  users: (state: { users: IUser[] }) => {
    return state.users;
  },
  user: (state: { user: IUser }) => {
    return state.user;
  },
};
