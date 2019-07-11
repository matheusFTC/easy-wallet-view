export interface IAsset {
  _id?: string;
  __v?: number;
  selected?: boolean;
  symbol: string;
  type: string;
  isEnabled: boolean;
  currentPrice?: number;
}

export interface IAssetQuery {
  symbol?: string;
  type?: string;
  isEnabled?: boolean;
  page?: number;
  perPage?: number;
}
