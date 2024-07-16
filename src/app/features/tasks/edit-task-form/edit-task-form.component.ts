import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SelectBoxComponent } from '../../../shared/components/select-box/select-box.component';
import { GetTaskByIdResponse, TasksControllerService } from '../../../shared/services/api';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectBoxComponent,
    ButtonComponent,
  ],
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskFormComponent implements OnInit {

  @Input() taskId!: number;

  editForm!: FormGroup;
  task!: GetTaskByIdResponse;

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
    this.createEditForm();
    this.getTask();
  }

  getTask() {
    this.taskService.getTaskById({ id: this.taskId })
      .subscribe(task => {
        this.task = task;
        this.editForm.patchValue({
          projectId: this.task.projectId,
          title: this.task.title,
          description: this.task.description,
          status: this.task.status
        });
      });
  }

  createEditForm() {
    this.editForm = this.formBuilder.group({
      projectId: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  onFormSubmit() {
    if (this.editForm.invalid) {
      this.toastr.warning('Please fill the form correctly.');
      return;
    }
    this.edit();
  }

  edit() {
    this.taskService.updateTaskById({
      id: this.taskId, updateTaskRequest: {
        projectId: this.editForm.value.projectId,
        title: this.editForm.value.title,
        description: this.editForm.value.description,
        status: this.editForm.value.status,
      },
    }).subscribe({
      next: () => {
        this.toastr.success('Task updated successfully.');
        this.editForm.reset();
        this.change.markForCheck();
        setTimeout(() => {
          this.router.navigate(['project/' + this.task.projectId + '/tasks']);
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
