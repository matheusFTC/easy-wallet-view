export default (query: any): string | null => {
  if (query) {
    let queryStr: string = '?';

    const keys = Object.keys(query);

    for (const index in keys) {
      if (keys.hasOwnProperty(index)) {
        const key: string = keys[index];

        queryStr += `${key}=${query[key]}&`;
      }
    }

    return queryStr.substring(0, queryStr.length - 1);
  } else {
    return null;
  }
};
