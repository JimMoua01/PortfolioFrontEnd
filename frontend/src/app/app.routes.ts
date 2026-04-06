import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ProjectsPage } from './pages/projects-page/projects-page';
import { ResumePage } from './pages/resume-page/resume-page';
import { ContactPage } from './pages/contact-page/contact-page';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'projects', component: ProjectsPage },
    { path: 'resume', component: ResumePage },
    { path: 'contact', component: ContactPage }
];
