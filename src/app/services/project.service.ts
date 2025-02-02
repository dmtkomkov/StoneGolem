import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProjectDto } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsSignal = signal<IProjectDto[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  loadProjects(): void {
    this.http.get<IProjectDto[]>('project').subscribe({
      next: (data: IProjectDto[]) => this.projectsSignal.set(data),
    });
  }

  getProjects(): Signal<IProjectDto[]> {
    return this.projectsSignal.asReadonly();
  }
}
