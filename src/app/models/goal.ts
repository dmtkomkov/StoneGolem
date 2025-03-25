import { IProjectFlat } from './project';
import { DateOnly } from '../types/DateOnly';

export interface IGoalFlat {
  id: number,
  name: string,
  color: string,
  description: string,
  startDate: DateOnly,
  closeDate: DateOnly,
  projectId?: number,
}

export interface ICreateGoal {
  name: string,
  color: string,
  description: string,
  startDate: DateOnly,
  closeDate: DateOnly,
  projectId?: number,
}

export interface IGoal extends IGoalFlat {
  project?: IProjectFlat,
}

export interface IGoalGroup {
  project: IProjectFlat | null,
  goals: IGoalFlat[],
}
