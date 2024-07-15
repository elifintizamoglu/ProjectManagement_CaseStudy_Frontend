import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeLayoutComponent } from "../../../shared/layouts/home-layout/home-layout.component";
import { GetProjectByIdResponse, ProjectsControllerService } from '../../../shared/services/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    HomeLayoutComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent implements OnInit {

  projectId!: number;
  project: GetProjectByIdResponse | undefined;

  constructor(private route: ActivatedRoute,
    private projectService: ProjectsControllerService,
    private change: ChangeDetectorRef,
  ) { }


  ngOnInit(): void {
    this.getProjectIdFromRoute();
    this.getProjectById(this.projectId);
  }


  getProjectIdFromRoute() {
    this.route.params.subscribe((params) => {
      const projectId = params['projectId']
      this.projectId = Number(projectId);
    })
  }

  getProjectById(id: number) {
    this.projectService.getProjectById({ id: id }).subscribe((project) => {
      this.project = project;
      this.change.markForCheck();
    })
  }
}
