import { IProjectFlat } from './Project';
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

export interface IGoal extends IGoalFlat {
  project?: IProjectFlat,
}
