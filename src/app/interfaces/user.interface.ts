import { IAddress } from './address.interface';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: IAddress;
}