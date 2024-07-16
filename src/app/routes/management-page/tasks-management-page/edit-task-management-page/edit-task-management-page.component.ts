import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { EditTaskFormComponent } from '../../../../features/tasks/edit-task-form/edit-task-form.component';
import { HomeLayoutComponent } from "../../../../shared/layouts/home-layout/home-layout.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task-management-page',
  standalone: true,
  imports: [
    CommonModule,
    EditTaskFormComponent,
    HomeLayoutComponent
],
  templateUrl: './edit-task-management-page.component.html',
  styleUrl: './edit-task-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskManagementPageComponent {

  projectId!: number;
  taskId!: number;

  constructor(private route: ActivatedRoute,
    private change: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProjectIdFromRoute();
  }

  getProjectIdFromRoute() {
    this.route.params.subscribe((params) => {
      const projectId = params['projectId'];
      this.projectId = Number(projectId);
      const taskId = params['taskId'];
      this.taskId = Number(taskId);
      this.change.markForCheck();
    });
  }

  goBackToTasks() {
    this.router.navigate(['project/' + this.projectId + '/tasks']);
  }

 }
