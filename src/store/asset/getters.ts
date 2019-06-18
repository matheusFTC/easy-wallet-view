import { IAsset } from '@/interfaces/i-asset';

export default {
  assets: (state: { assets: IAsset[] }) => {
    return state.assets;
  },
  asset: (state: { asset: IAsset }) => {
    return state.asset;
  },
};
