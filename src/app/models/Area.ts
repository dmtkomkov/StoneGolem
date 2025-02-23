import { ICategoryFlatDto } from './Category';

export interface IAreaFlat {
  id: number,
  name: string,
  color: string,
  description: string,
}

export interface IArea extends IAreaFlat {
  categories: ICategoryFlatDto[],
}
