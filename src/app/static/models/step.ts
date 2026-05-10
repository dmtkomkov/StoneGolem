import { DateOnly } from '../types/DateOnly';
import { ICategory } from './category';
import { IGoal } from './goal';
import { IUser } from './user';

export interface IStep {
  id: number,
  duration: number,
  completedOn: DateOnly,
  updatedOn: DateOnly,
  isDeleted: boolean,
  description: string,
  user: IUser,
  category: ICategory,
  goal?: IGoal,
}

export interface ICreateStep {
  duration: number,
  completedOn: DateOnly,
  description: string,
  userId?: string,
  categoryId: number,
  goalId?: number,
}

export interface IStepGroup {
  completedOn: DateOnly,
  steps: IStep[],
}

export interface IPagination {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IPagedStepGroup extends IPagination {
  items: IStepGroup[];
}
