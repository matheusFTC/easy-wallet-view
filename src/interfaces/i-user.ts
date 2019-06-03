export interface IUser {
  _id?: string;
  __v?: number;
  selected?: boolean;
  email: string;
  name: string;
  isEnabled: boolean;
  type: string;
  password?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
}
