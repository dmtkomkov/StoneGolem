import { IProjectFlatDto } from './Project';
import { DateOnly } from '../types/DateOnly';

export interface IGoalFlatDto {
  id: number,
  name: string,
  color: string,
  description: string,
  startDate: DateOnly,
  closeDate: DateOnly,
  projectId?: number,
}

export interface IGoalDto extends IGoalFlatDto {
  project?: IProjectFlatDto,
}
