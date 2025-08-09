import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../models/project';
import { Observable } from 'rxjs';
import { IStep } from '../models/step';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(
    private http: HttpClient
  ) {
  }

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>('project');
  }

  getProjectByName(name: string): Observable<IProject> {
    return this.http.get<IProject>('project/' + name);
  }

  toggleProject(id: number): Observable<IStep> {
    return this.http.put<IStep>('project/toggle/' + id, null);
  }
}
