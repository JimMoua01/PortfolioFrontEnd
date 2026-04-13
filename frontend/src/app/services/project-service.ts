import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectList = new BehaviorSubject<Project[]>([]);
  projects$ = this.projectList.asObservable();

  // api = "http://localhost:3000";
  // api = "https://portfolioprojectbackend.onrender.com";
  // api = "https://localhost:7293/api/portfolio";
  api = "https://portfoliobackendapi-mgz0.onrender.com/api/portfolio"

  constructor(private http: HttpClient) {
    this.loadProjects();
  }

  loadProjects() {
    this.http.get<Project[]>(`${this.api}/projectData`).subscribe(data => {
      this.projectList.next(data.sort((a, b) => a.id - b.id));
    });
  }

  addProject(project: Project) {
    this.http.post(`${this.api}/projectData`, project).subscribe(() => {
      this.loadProjects();
    });
  }
}
