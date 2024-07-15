import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeLayoutComponent } from "../../../shared/layouts/home-layout/home-layout.component";
import { ProjectListComponent } from '../../../features/projects/project-list/project-list.component';
import { ProjectsCardListComponent } from '../../../features/projects/projects-card-list/projects-card-list.component';

@Component({
  selector: 'app-projects-management-page',
  standalone: true,
  imports: [
    CommonModule,
    HomeLayoutComponent,
    ProjectListComponent,
    ProjectsCardListComponent
],
  templateUrl: './projects-management-page.component.html',
  styleUrl: './projects-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsManagementPageComponent { }
