export interface IAsset {
  _id?: string;
  __v?: number;
  selected?: boolean;
  symbol: string;
  type: string;
  isEnabled: boolean;
}

export interface IAssetQuery {
  symbol?: string;
  type?: string;
  isEnabled?: boolean;
}
