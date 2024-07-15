import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeLayoutComponent } from "../../../shared/layouts/home-layout/home-layout.component";
import { ProjectListComponent } from '../../../features/projects/project-list/project-list.component';
import { ProjectsCardListComponent } from '../../../features/projects/projects-card-list/projects-card-list.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects-management-page',
  standalone: true,
  imports: [
    CommonModule,
    HomeLayoutComponent,
    ProjectListComponent,
    ProjectsCardListComponent,
    ButtonComponent,
    RouterModule,
],
  templateUrl: './projects-management-page.component.html',
  styleUrl: './projects-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsManagementPageComponent { }
