import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddTaskRequestParams, TasksControllerService } from '../../../shared/services/api';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SelectBoxComponent } from '../../../shared/components/select-box/select-box.component';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectBoxComponent,
    ButtonComponent,
  ],
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskFormComponent implements OnInit {

  @Input() projectId!: number;

  form!: FormGroup;
  statuses: { label: string, value: string }[] = [
    { label: ' ', value: ' ' },
    { label: 'New', value: 'NEW' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Completed', value: 'COMPLETED' }
  ];

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private change: ChangeDetectorRef,
              private taskService: TasksControllerService) { }

  ngOnInit(): void {
    this.createForm();
    this.form.patchValue({ projectId: this.projectId });
  }

  createForm() {
    this.form = this.formBuilder.group({
      projectId: [this.projectId, [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  onFormSubmit() {
    //event.preventDefault();
    if (this.form.invalid) {
      this.toastr.warning('Please fill the form correctly.');
      return;
    }
    this.add();
  }

  add() {
    const request: AddTaskRequestParams = {
      createTaskRequest: {
        projectId: this.form.value.projectId,
        title: this.form.value.title,
        description: this.form.value.description,
        status: this.form.value.status,
      }
    };

    this.taskService.addTask(request).subscribe({
      next: () => {
        this.toastr.success('Task added successfully.');
        this.form.reset();
        this.change.markForCheck();
        setTimeout(() => {
          this.router.navigate(['/project/' + this.projectId + '/tasks']);
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
