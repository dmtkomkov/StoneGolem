import { IAreaFlat } from './Area';

export interface ICategoryFlatDto {
  id: number,
  name: string,
  color: string,
  description: string,
  areaId: number,
}

export interface ICategory extends ICategoryFlatDto {
  area: IAreaFlat,
}
