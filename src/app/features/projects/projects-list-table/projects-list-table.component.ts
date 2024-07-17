import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetAllProjectsResponse, ProjectsControllerService } from '../../../shared/services/api';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { TokenService } from '../../token/token.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private projectService: ProjectsControllerService,
    private change: ChangeDetectorRef,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
   this.getProjects(); 
  }

  getProjects() {
    this.projectService.getAllProjects().subscribe((response) => {
      this.projects = response;
      this.change.markForCheck();
    });
  }

  onEdit(projectId: number) {
    if (this.tokenService.isLoggedIn()) {
      this.router.navigate(['/project/edit/', projectId])
    } else {
      this.toastr.warning('Please login to edit this project.')
    }
  }

  onDelete(projectId: number) {
    if (this.tokenService.isLoggedIn()) {
      this.projectService.deleteProjectById({ id: projectId }).subscribe({
        next: () => {
          this.toastr.success('Project deleted succesfully.');
        },
        error: (error) => {
          if (error.error && error.error.message) {
            this.toastr.error(error.error.message);
          } else {
            this.toastr.error('An unexpected error occurred. Please try again.');
          }
        },
        complete: () => {
          this.getProjects();
        }
      })
    } else {
      this.toastr.warning('Please login to delete this project.');
    }
  }

}
