import { DateOnly } from '../types/DateOnly';
import { IGoalFlat } from './Goal';
import { ProjectStatus } from '../types/Status';

export interface IProjectFlat {
  id: number,
  name: string,
  color: string,
  description: string,
  status: ProjectStatus,
  startDate: DateOnly,
  closeDate: DateOnly,
}

export interface IProject extends IProjectFlat {
  goals: IGoalFlat[];
}
