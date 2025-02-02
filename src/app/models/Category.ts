import { IAreaFlatDto } from './Area';

export interface ICategoryFlatDto {
  id: number,
  name: string,
  color: string,
  description: string,
  areaId: number,
}

export interface ICategoryDto extends ICategoryFlatDto {
  area: IAreaFlatDto,
}
