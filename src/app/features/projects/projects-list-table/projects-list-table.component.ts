import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetAllProjectsResponse, ProjectsControllerService } from '../../../shared/services/api';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-projects-list-table',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    RouterModule,
    NgxPaginationModule,
  ],
  templateUrl: './projects-list-table.component.html',
  styleUrl: './projects-list-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListTableComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 10;

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
