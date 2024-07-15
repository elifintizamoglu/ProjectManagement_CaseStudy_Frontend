import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../../features/token/token.service';
import { HomeLayoutComponent } from '../../../shared/layouts/home-layout/home-layout.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TaskListComponent } from "../../../features/tasks/task-list/task-list.component";

@Component({
  selector: 'app-tasks-management-page',
  standalone: true,
  imports: [
    CommonModule,
    HomeLayoutComponent,
    ButtonComponent,
    TaskListComponent
],
  templateUrl: './tasks-management-page.component.html',
  styleUrl: './tasks-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksManagementPageComponent {

  constructor(private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
  ) { }
}
