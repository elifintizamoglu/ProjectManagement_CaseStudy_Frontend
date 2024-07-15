import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetAllProjectsResponse, ProjectsControllerService } from '../../../shared/services/api';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-projects-card-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
  ],
  templateUrl: './projects-card-list.component.html',
  styleUrl: './projects-card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsCardListComponent implements OnInit{

  projects: GetAllProjectsResponse[] = [];

  constructor(private projectService : ProjectsControllerService,
     private router: Router,
    private change: ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.getProjects();
  } 

  getProjects() {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects = projects;
      this.change.markForCheck();
    })
  }

  onSeeTasksButtonClick(projectId: number) {
    this.router.navigate(['/project/', projectId, 'tasks']);
  }

}
