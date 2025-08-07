import { ICreateProject, IProjectFlat } from './project';
import { DateOnly } from '../types/DateOnly';

export interface IGoalFlat {
  id: number,
  name: string,
  description: string,
  startDate: DateOnly,
  closeDate: DateOnly,
  projectId?: number,
}

export interface ICreateGoal {
  name: string,
  description: string,
  projectId?: number,
  project?: ICreateProject,
}

export interface IGoal extends IGoalFlat {
  project?: IProjectFlat,
  stepCount: number,
}

export interface IGoalGroup {
  project: IProjectFlat | null,
  goals: IGoalFlat[],
}
