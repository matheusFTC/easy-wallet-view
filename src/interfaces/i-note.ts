import { IUser } from '@/interfaces/i-user';

export interface INote {
  _id?: string;
  __v?: number;
  selected?: boolean;
  user: IUser;
  executedIn: Date | null;
  executedInFormatted?: string;
  settlementFee: number | null;
  isEnabled: boolean;
}
