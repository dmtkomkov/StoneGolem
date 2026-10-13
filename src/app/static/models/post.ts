import { IUser } from './user';
import { IPagination } from './pagination';

export interface IPost {
  id: number;
  title: string;
  body: string;
  createdOn: string;
  isDeleted: boolean;
  user: IUser;
}

// Create and update payload
export interface ICreatePost {
  title: string;
  body: string;
}

export interface IPagedPost extends IPagination {
  items: IPost[];
}