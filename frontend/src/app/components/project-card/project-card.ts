import { Component, Input } from '@angular/core';
import { Project } from '../../models/project';
import { MatCardModule, MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-project-card',
  imports: [MatCard, MatCardTitle, MatCardContent],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  @Input() project!: Project
}
