import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddProjectFormComponent } from "../../../../features/projects/add-project-form/add-project-form.component";
import { RouterModule } from '@angular/router';
import { HomeLayoutComponent } from "../../../../shared/layouts/home-layout/home-layout.component";

@Component({
  selector: 'app-add-project-management-page',
  standalone: true,
  imports: [
    CommonModule,
    AddProjectFormComponent,
    RouterModule,
    HomeLayoutComponent
],
  templateUrl: './add-project-management-page.component.html',
  styleUrl: './add-project-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProjectManagementPageComponent { }
