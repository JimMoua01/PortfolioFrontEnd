import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { ProjectCard } from '../../components/project-card/project-card';
import { AddProjectForm } from '../../components/add-project-form/add-project-form';
import { ProjectService } from '../../services/project-service';
import { Project } from '../../models/project';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projects-page',
  imports: [NavigationBar, ProjectCard, AddProjectForm, CommonModule, MatButtonModule],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage {
  projects$!: Observable<Project[]>;
  filter: string = 'all';

  constructor(private projectService : ProjectService) {
    this.projects$! = this.projectService.projects$;
  }

  filterProjects(value: 'all' | 'other' | 'software') {
    this.filter = value;
  }
}
