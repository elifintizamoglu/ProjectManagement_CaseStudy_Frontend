import { Routes } from '@angular/router';
import { ProjectsManagementPageComponent } from './projects-management-page/projects-management-page.component';
import { AddProjectManagementPageComponent } from './projects-management-page/add-project-management-page/add-project-management-page.component';
import { userGuard } from '../../shared/guards/user.guard';
import { TasksManagementPageComponent } from './tasks-management-page/tasks-management-page.component';
import { AddTaskManagementPageComponent } from './tasks-management-page/add-task-management-page/add-task-management-page.component';


export const managementRoutes: Routes = [
    {
        path: '', // localhost:4200/projects
        component: ProjectsManagementPageComponent,
    },
    {
        path: 'project/create', // localhost:4200/projects/create
        canActivate: [userGuard],
        component: AddProjectManagementPageComponent,
    },
    {
        path: 'project/:projectId/tasks', // localhost:4200/project/detail/1
        component: TasksManagementPageComponent,  
    },
    {
        path: 'project/:projectId/tasks/create', // localhost:4200/project/detail/1/tasks/create
        component: AddTaskManagementPageComponent,  
    },
    
];