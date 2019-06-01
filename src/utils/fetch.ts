import { getCookie } from '@/utils/cookie';

export default (url: string, requestInit: RequestInit = {}) => {
  const token = getCookie('token') || '';

  requestInit.headers = new Headers(requestInit.headers);
  requestInit.headers.append('x-access-token', token);

  return fetch(url, requestInit)
    .then((res) => {
      return res.json();
    });
};
