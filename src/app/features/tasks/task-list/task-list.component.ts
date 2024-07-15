import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProjectByIdResponse, GetTasksByProjectIdResponse, ProjectsControllerService, TasksControllerService } from '../../../shared/services/api';
import { HomeLayoutComponent } from '../../../shared/layouts/home-layout/home-layout.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    HomeLayoutComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {

  projectId!: number;
  project: GetProjectByIdResponse | undefined;
  tasks: GetTasksByProjectIdResponse[] = [];
  newTasks: GetTasksByProjectIdResponse[] = [];
  inProgressTasks: GetTasksByProjectIdResponse[] = [];
  completedTasks: GetTasksByProjectIdResponse[] = [];


  constructor(private route: ActivatedRoute,
    private projectService: ProjectsControllerService,
    private tasksService: TasksControllerService,
    private change: ChangeDetectorRef,
  ) { }


  ngOnInit(): void {
    this.getProjectIdFromRoute();
    this.getProjectById(this.projectId);
    this.getTasksByProjectId(this.projectId);
  }

  getProjectIdFromRoute() {
    this.route.params.subscribe((params) => {
      const projectId = params['projectId']
      this.projectId = Number(projectId);
    })
  }

  getProjectById(id: number) {
    this.projectService.getProjectById({ id: id }).subscribe((project) => {
      this.project = project;
      this.change.markForCheck();
    })
  }

  getTasksByProjectId(projectId: number) {
    this.tasksService.getTasksByProjectId({projectId}).subscribe((tasks) => {
      this.tasks = tasks;
      this.categorizeTasks();
      this.change.markForCheck();

    })
  }

  categorizeTasks() {
    this.newTasks = this.tasks.filter(task => task.status === 'NEW');
    this.inProgressTasks = this.tasks.filter(task => task.status === 'IN_PROGRESS');
    this.completedTasks = this.tasks.filter(task => task.status === 'COMPLETED');
  }
}
