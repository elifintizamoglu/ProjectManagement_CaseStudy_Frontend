import { Routes } from '@angular/router';
import { ProjectsManagementPageComponent } from './projects-management-page/projects-management-page.component';
import { AddProjectManagementPageComponent } from './projects-management-page/add-project-management-page/add-project-management-page.component';
import { userGuard } from '../../shared/guards/user.guard';
import { TasksManagementPageComponent } from './tasks-management-page/tasks-management-page.component';
import { AddTaskManagementPageComponent } from './tasks-management-page/add-task-management-page/add-task-management-page.component';
import { EditTaskManagementPageComponent } from './tasks-management-page/edit-task-management-page/edit-task-management-page.component';
import { EditProjectManagementPageComponent } from './projects-management-page/edit-project-management-page/edit-project-management-page.component';


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
        path: 'project/edit/:projectId',
        canActivate: [userGuard],
        component: EditProjectManagementPageComponent,
    },
    {
        path: 'project/:projectId/tasks', // localhost:4200/project/1/tasks
        component: TasksManagementPageComponent,  
    },
    {
        path: 'project/:projectId/tasks/create', // localhost:4200/project/detail/1/tasks/create
        canActivate: [userGuard],
        component: AddTaskManagementPageComponent,  
    },
    {
        path: 'project/:projectId/tasks/edit/:taskId', // localhost:4200/project/1/tasks/edit/1
        canActivate: [userGuard],
        component: EditTaskManagementPageComponent,  
    },
];