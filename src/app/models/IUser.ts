export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: string;
  is_blocked?: boolean;
  createdAt?: Date;
}
