import { IAsset } from '@/interfaces/i-asset';
import { IUser } from '@/interfaces/i-user';

export interface INote {
  _id?: string;
  __v?: number;
  selected?: boolean;
  user: IUser;
  executedIn: Date | null;
  executedInFormatted?: string | null;
  settlementFee: number | null;
  status?: string;
  isEnabled: boolean;
}

export interface ITypeItemCreateNote {
  value: string;
  text: string;
}

export interface IItemCreateNote {
  asset: IAsset;
  price?: number;
  quantity?: number;
  type?: ITypeItemCreateNote;
}
