import { Routes } from '@angular/router';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ProjectListComponent
    }
];
