import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output } from '@angular/core';
import { HomeLayoutComponent } from '../../../../shared/layouts/home-layout/home-layout.component';
import { AddTaskFormComponent } from '../../../../features/tasks/add-task-form/add-task-form.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-task-management-page',
  standalone: true,
  imports: [
    CommonModule,
    HomeLayoutComponent,
    AddTaskFormComponent,
    RouterModule,
  ],
  templateUrl: './add-task-management-page.component.html',
  styleUrl: './add-task-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskManagementPageComponent {


   projectId!: number;

  constructor(private route: ActivatedRoute,
    private change: ChangeDetectorRef,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.getProjectIdFromRoute();
  }

  getProjectIdFromRoute() {
    this.route.params.subscribe((params) => {
      const projectId = params['projectId'];
      this.projectId = Number(projectId);
      this.change.markForCheck();
    });
  }

  goBackToTasks() {
    this.router.navigate(['project/' + this.projectId + '/tasks']);
  }

}
