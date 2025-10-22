import { DateOnly } from '../types/DateOnly';
import { IGoalFlat } from './goal';
import { ProjectStatus } from '../types/Status';

export interface IProjectFlat {
  id: number,
  name: string,
  color: string,
  description: string,
  status: ProjectStatus,
  startDate: DateOnly,
  endDate: DateOnly,
}

export interface ICreateProject {
  name: string,
  color: string,
  description: string,
}

export interface IProject extends IProjectFlat {
  goals: IGoalFlat[];
}
