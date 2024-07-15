import { Routes } from '@angular/router';
import { ProjectsManagementPageComponent } from './projects-management-page/projects-management-page.component';
import { ProjectDetailComponent } from '../../features/projects/project-detail/project-detail.component';
import { AddProjectManagementPageComponent } from './projects-management-page/add-project-management-page/add-project-management-page.component';
import { userGuard } from '../../shared/guards/user.guard';


export const managementRoutes: Routes = [
    {
        path: 'projects', // localhost:4200/projects
        component: ProjectsManagementPageComponent,
    },
    {
        path: 'projects/create', // localhost:4200/projects/create
        component: AddProjectManagementPageComponent,
    },
    {
        path: 'project/detail/:projectId', // localhost:4200/project/detail/1
        component: ProjectDetailComponent,  
    },
    
];