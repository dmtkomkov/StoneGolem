import { IAreaFlat, ICreateArea } from './area';

export interface ICategoryFlat {
  id: number,
  name: string,
  description: string,
  areaId: number,
}

export interface ICreateCategory {
  name: string,
  description: string,
  areaId?: number,
  area?: ICreateArea,
}

export interface ICategory extends ICategoryFlat {
  area: IAreaFlat,
  stepCount: number,
}

export interface ICategoryGroup {
  area: IAreaFlat;
  categories: ICategoryFlat[];
}
