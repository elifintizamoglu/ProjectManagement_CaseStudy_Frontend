import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeLayoutComponent } from '../../../../shared/layouts/home-layout/home-layout.component';
import { EditProjectFormComponent } from '../../../../features/projects/edit-project-form/edit-project-form.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-project-management-page',
  standalone: true,
  imports: [
    CommonModule,
    HomeLayoutComponent,
    EditProjectFormComponent,
    RouterModule,
  ],
  templateUrl: './edit-project-management-page.component.html',
  styleUrl: './edit-project-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectManagementPageComponent { }
