import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GetProjectByIdResponse, GetTasksByProjectIdResponse, ProjectsControllerService, TasksControllerService } from '../../../shared/services/api';
import { HomeLayoutComponent } from '../../../shared/layouts/home-layout/home-layout.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    HomeLayoutComponent,
    CardComponent,
    RouterModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  projectId!: number;
  project: GetProjectByIdResponse | undefined;
  newTasks: GetTasksByProjectIdResponse[] = [];
  inProgressTasks: GetTasksByProjectIdResponse[] = [];
  completedTasks: GetTasksByProjectIdResponse[] = [];

  constructor(private route: ActivatedRoute,
              private projectService: ProjectsControllerService,
              private tasksService: TasksControllerService,
              private change: ChangeDetectorRef,
            private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProjectIdFromRoute();
    this.getProjectById(this.projectId);
    this.getTasksByProjectId(this.projectId);
  }

  getProjectIdFromRoute() {
    this.route.params.subscribe((params) => {
      const projectId = params['projectId'];
      this.projectId = Number(projectId);
    });
  }

  getProjectById(id: number) {
    this.projectService.getProjectById({ id }).subscribe((project) => {
      this.project = project;
      this.change.markForCheck();
    });
  }

  getTasksByProjectId(projectId: number) {
    this.tasksService.getTasksByProjectId({ projectId }).subscribe((tasks) => {
      this.newTasks = tasks.filter(task => task.status === 'NEW');
      this.inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS');
      this.completedTasks = tasks.filter(task => task.status === 'COMPLETED');
      this.change.markForCheck();
    });
  }

  updateTask(taskId: number) {
    
  }

  deleteTask(taskId: number) {
    this.tasksService.deleteTaskById({id:taskId}).subscribe({
      next: () => {
        this.toastr.success('Task deleted succesfully.');
      },
      error: (error) => {
        if (error.error && error.error.message) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error('An unexpected error occurred. Please try again.');
        }
      },
      complete: () => {
        this.getTasksByProjectId(this.projectId);
      } 
    })
  }
}
