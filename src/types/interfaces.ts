export interface IUser {
  _id: number;
  firstName: string;
  secondName: string;
  age: number;
  city: string;
  university: string;
  email: string;
  friends: IUsers;
  avatarUrl: string;
}

export interface IPost {
  _id: number;
  text: string;
  imageUrl: string;
  likes: IUsers;
  user: IUser;
  createdAt: string;
}

export interface ILogData {
  email: string;
  password: string;
}

export interface ISignupData {
  avatarUrl: string;
  firstName: string;
  secondName: string;
  age: number;
  city: string;
  university: string;
  email: string;
  password: string;
}

export interface IUsers extends Array<IUser> {}

export interface IPosts extends Array<IPost> {}
