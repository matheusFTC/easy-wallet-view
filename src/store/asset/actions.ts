import { IAsset, IAssetQuery } from '@/interfaces/i-asset';

import fetch from '@/utils/fetch';
import queryFormatter from '@/utils/query-formatter';

export default {
  fetchAssets(context: any, { query }: { query: IAssetQuery }) {
    return fetch(`api/v1/assets${queryFormatter(query)}`)
      .then((res) => {
        context.commit('setAssets', res);
      });
  },
  fetchAsset(context: any, { _id }: { _id: string }) {
    return fetch(`api/v1/assets/${_id}`)
      .then((res) => {
        context.commit('setAsset', res);
      });
  },
  insertAsset(context: any, { asset }: { asset: IAsset }) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify(asset);

    return fetch('api/v1/assets', {
      method: 'POST',
      headers,
      body,
    });
  },
  updateAsset(context: any, { asset }: { asset: IAsset }) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify(asset);

    return fetch(`api/v1/assets/${asset._id}`, {
      method: 'PUT',
      headers,
      body,
    });
  },
  deleteUser(context: any, { _id }: { _id: string }) {
    return fetch(`api/v1/assets/${_id}`, {
      method: 'DELETE',
    });
  },
};
