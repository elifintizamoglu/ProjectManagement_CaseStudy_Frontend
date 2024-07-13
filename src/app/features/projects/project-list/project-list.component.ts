import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetAllProjectsResponse, ProjectsControllerService } from '../../../shared/services/api';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit {

  projects!: GetAllProjectsResponse[];

  constructor(private projectService: ProjectsControllerService, private change: ChangeDetectorRef) {

  }
  ngOnInit(): void {

    this.projectService.getAllProjects().subscribe((response) => {
      this.projects = response;
      this.change.markForCheck();
    });
  }


}
