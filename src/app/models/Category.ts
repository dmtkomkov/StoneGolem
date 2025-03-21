import {IArea, IAreaFlat} from './Area';

export interface ICategoryFlat {
  id: number,
  name: string,
  color: string,
  description: string,
  areaId: number,
}

export interface ICategory extends ICategoryFlat {
  area: IAreaFlat,
}

export interface ICategoryGroup {
  area: IArea;
  categories: ICategory[];
}
