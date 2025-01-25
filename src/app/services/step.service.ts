import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  constructor(
    private http: HttpClient,
  ) { }

  getSteps(): Observable<any> {
    return this.http.get('step');
  }
}
