import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IArea } from '../models/area';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  constructor(
    private http: HttpClient,
  ) {}

  getAreasAsync(): Observable<IArea[]> {
    return this.http.get<IArea[]>('area')
  }
}
