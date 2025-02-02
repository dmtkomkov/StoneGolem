import { DateOnly } from '../types/DateOnly';
import { ICategoryDto } from './Category';
import { IGoalDto } from './Goal';
import { IExportUserFlatDto } from './User';

export interface IStepDto {
  id: number,
  duration: number,
  completedOn: DateOnly,
  description: string,
  userId: string,
  user: IExportUserFlatDto,
  category: ICategoryDto,
  goal?: IGoalDto,
}
