import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  // api = "http://localhost:3000";
  // api = "https://portfolioprojectbackend.onrender.com";
  // api = "https://localhost:7293/api/portfolio";
  api = "https://portfoliobackendapi-mgz0.onrender.com/api/portfolio"

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.api}/projectData`);
  }

  addProject(project: Project) {
    return this.http.post(`${this.api}/projectData`, project);
  }
}
