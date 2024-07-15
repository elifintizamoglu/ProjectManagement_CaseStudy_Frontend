import { Routes } from '@angular/router';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { authentication } from './routes/authentication/authentication.routes';
import { managementRoutes } from './routes/management-page/management.routes';

export const routes: Routes = [
    ...authentication,
    ...managementRoutes,
    {
        path: '',
        pathMatch: 'full',
        component: ProjectListComponent
    }
];
