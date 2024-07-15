import { Routes } from '@angular/router';
import { ProjectsManagementPageComponent } from './projects-management-page/projects-management-page.component';
import { ProjectDetailComponent } from '../../features/projects/project-detail/project-detail.component';


export const managementRoutes: Routes = [
    {
        path: 'projects', // localhost:4200/projects
        component: ProjectsManagementPageComponent,  
    },
    {
        path: 'project/detail/:projectId', // localhost:4200/project/detail/1
        component: ProjectDetailComponent,  
    },
];