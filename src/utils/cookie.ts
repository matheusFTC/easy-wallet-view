export const setCookie = (name: string, value: string, expires: number | null | undefined) => {
  let strExpires;

  if (expires) {
    const dateExpires = new Date();

    dateExpires.setTime(expires);

    strExpires = 'expires=' + dateExpires.toUTCString();
  } else {
    strExpires = 'expires=Wed; 01 Jan 1970';
  }

  document.cookie = name + '=' + value + ';' + strExpires + ';path=/';
};

export const getCookie = (name: string) => {
  const cn = name + '=';
  const ca = document.cookie.split(';');

  for (let c of ca) {
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(cn) === 0) {
      return c.substring(cn.length, c.length);
    }
  }

  return '';
};
