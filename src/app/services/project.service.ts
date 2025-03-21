import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsSignal = signal<IProject[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  loadProjects(): void {
    this.http.get<IProject[]>('project').subscribe({
      next: (data: IProject[]) => this.projectsSignal.set(data),
    });
  }

  getProjects(): Signal<IProject[]> {
    return this.projectsSignal.asReadonly();
  }
}
