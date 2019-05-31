import { IUser } from '@/interfaces/i-user';

export const fetchUsers = () => ({ type: 'user/fetchUsers' });
export const fetchUser = (_id: string) => ({ type: 'user/fetchUser', _id });
export const insertUser = (user: IUser) => ({ type: 'user/insertUser', user });
export const updateUser = (user: IUser) => ({ type: 'user/updateUser', user });
export const deleteUser = (_id: string) => ({ type: 'user/deleteUser', _id });

export const users = 'user/users';
export const user = 'user/user';
