import { ICategoryFlatDto } from './Category';

export interface IAreaFlatDto {
  id: number,
  name: string,
  color: string,
  description: string,
}

export interface IAreaDto extends IAreaFlatDto {
  categories: ICategoryFlatDto[],
}
