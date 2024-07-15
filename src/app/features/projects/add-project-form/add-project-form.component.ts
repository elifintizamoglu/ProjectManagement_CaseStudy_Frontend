import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddProjectRequestParams, ProjectsControllerService } from '../../../shared/services/api';

@Component({
  selector: 'app-add-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './add-project-form.component.html',
  styleUrl: './add-project-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProjectFormComponent implements OnInit {

  form!: FormGroup;
  minDate: string | undefined;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private projectService: ProjectsControllerService,
    private change: ChangeDetectorRef,
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.createForm();
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
    this.addProject();
  }

  addProject() {
    const request: AddProjectRequestParams = {
      createProjectRequest: {
        name: this.form.value.name,
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate
      }
    }

    this.projectService.addProject(request).subscribe({
      next: (response) => {
        this.toastr.success('Project added succesfully.');
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
