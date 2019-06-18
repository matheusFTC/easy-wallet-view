import { IAsset } from '@/interfaces/i-asset';

export default {
  setAssets(state: { assets: IAsset[] }, assets: IAsset[]) {
    state.assets = assets;
  },
  setAsset(state: { asset: IAsset }, asset: IAsset) {
    state.asset = asset;
  },
};
