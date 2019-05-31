import { IUser } from '@/interfaces/i-user';

export default {
  setUsers(state: { users: IUser[] }, users: IUser[]) {
    state.users = users;
  },
  setUser(state: { user: IUser }, user: IUser) {
    state.user = user;
  }
};
