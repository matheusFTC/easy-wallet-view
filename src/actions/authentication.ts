export const authenticate = (email: string, password: string) => ({
  type: 'authentication/authenticate',
  email,
  password,
});
export const restore = () => ({ type: 'authentication/restore' });
export const logoff = () => ({ type: 'authentication/logoff' });

export const expires = 'authentication/expires';
export const token = 'authentication/token';
export const loggedUser = 'authentication/loggedUser';
