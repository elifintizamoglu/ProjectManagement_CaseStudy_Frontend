import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { ProjectsControllerService, AddProjectRequestParams, GetProjectByIdResponse, UpdateProjectByIdRequestParams } from '../../../shared/services/api';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-edit-project-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './edit-project-form.component.html',
  styleUrl: './edit-project-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectFormComponent {

  form!: FormGroup;
  minDate: string | undefined;
  projectId!: number;
  project!: GetProjectByIdResponse;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private projectService: ProjectsControllerService,
    private change: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.createForm();
    this.getProjectIdFromRoute();
    this.getProjectById(this.projectId);
  }

  getProjectById(projectId: number) {
    this.projectService.getProjectById({id: projectId}).subscribe(project => {
      this.project = project;
      this.form.patchValue({
        name: this.project.name,
        startDate: this.project.startDate,
        endDate: this.project.endDate,
      });
    })
  }

  getProjectIdFromRoute() {
    this.route.params.subscribe((params) => {
      const projectId = params['projectId'];
      this.projectId = Number(projectId);
    });
  }


  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });
  }

  onFormSubmit() {
    if (this.form.invalid) {
      this.toastr.warning('Please fill the form correctly.');
      return;
    }
    this.editProject();
  }

  editProject() {
    const request: UpdateProjectByIdRequestParams = {
      id: this.projectId,
      updateProjectRequest: {
        name: this.form.value.name,
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate
      }
    }

    this.projectService.updateProjectById(request).subscribe({
      next: (response) => {
        this.toastr.success('Project updated succesfully.');
        this.form.reset();
        this.change.markForCheck();
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1500);
      },
      error: (error) => {
        if (error.error && error.error.detail) {
          this.toastr.error(error.error.detail);
        } else {
          this.toastr.error('An unexpected error occurred. Please try again.');
        }
        this.change.markForCheck();
      }
    });
  }

}
