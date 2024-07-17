import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeLayoutComponent } from "../../../shared/layouts/home-layout/home-layout.component";
import { ProjectListComponent } from '../../../features/projects/project-list/project-list.component';
import { ProjectsCardListComponent } from '../../../features/projects/projects-card-list/projects-card-list.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../../features/token/token.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectsListTableComponent } from '../../../features/projects/projects-list-table/projects-list-table.component';

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
    ProjectsListTableComponent,
  ],
  templateUrl: './projects-management-page.component.html',
  styleUrl: './projects-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsManagementPageComponent {

  constructor(private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  goToAddProjectPage() {
    if (this.tokenService.isLoggedIn()) {
      this.router.navigate(['/project/create']);
    } else {
      this.toastr.warning('Please login to add a project.');
    }
  }
}
