import { DateOnly } from '../types/DateOnly';
import { IGoalFlatDto } from './Goal';
import { ProjectStatus } from '../types/Status';

export interface IProjectFlatDto {
  id: number,
  name: string,
  color: string,
  description: string,
  status: ProjectStatus,
  startDate: DateOnly,
  closeDate: DateOnly,
}

export interface IProjectDto extends IProjectFlatDto {
  goals: IGoalFlatDto[];
}
