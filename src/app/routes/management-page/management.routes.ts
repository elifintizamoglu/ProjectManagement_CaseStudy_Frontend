import { Routes } from '@angular/router';
import { ProjectsManagementPageComponent } from './projects-management-page/projects-management-page.component';
import { AddProjectManagementPageComponent } from './projects-management-page/add-project-management-page/add-project-management-page.component';
import { userGuard } from '../../shared/guards/user.guard';
import { TaskListComponent } from '../../features/tasks/task-list/task-list.component';


export const managementRoutes: Routes = [
    {
        path: '', // localhost:4200/projects
        component: ProjectsManagementPageComponent,
    },
    {
        path: 'projects/create', // localhost:4200/projects/create
        canActivate: [userGuard],
        component: AddProjectManagementPageComponent,
    },
    {
        path: 'project/:projectId/tasks', // localhost:4200/project/detail/1
        component: TaskListComponent,  
    },
    
];