import { IUser } from '@/interfaces/i-user';

export const authenticate = (referenceCode: string, password: string) => ({
  type: 'authentication/authenticate',
  referenceCode,
  password,
});
export const restore = () => ({ type: 'authentication/restore' });
export const logoff = () => ({ type: 'authentication/logoff' });

export const expires = 'authentication/expires';
export const token = 'authentication/token';
export const loggedUser = 'authentication/loggedUser';
