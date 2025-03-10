import { DateOnly } from '../types/DateOnly';
import { ICategory } from './Category';
import { IGoal } from './Goal';
import { IUser } from './User';

export interface IStep {
  id: number,
  duration: number,
  completedOn: DateOnly,
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
