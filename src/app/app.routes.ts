import { Routes } from '@angular/router';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { authentication } from './routes/authentication/authentication.routes';

export const routes: Routes = [
    ...authentication,
    {
        path: '',
        pathMatch: 'full',
        component: ProjectListComponent
    }
];
