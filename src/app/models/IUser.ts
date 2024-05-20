export interface IUser {
  _id?: string;
  name: string;
  email: string;
  address:string;
  mobile:string;
  gender: string
  is_blocked?: boolean;
  createdAt?: Date;
}

export interface ApiResponse<T> {
  message?: string;
  data: T;
}
