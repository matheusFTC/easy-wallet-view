import { IAssetQuery } from '@/interfaces/i-asset';

export const fetchAssets = (query: IAssetQuery) => ({ type: 'asset/fetchAssets', query });

export const assets = 'asset/assets';
export const finding = 'asset/finding';
