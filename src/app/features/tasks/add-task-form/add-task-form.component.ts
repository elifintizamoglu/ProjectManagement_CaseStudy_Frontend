import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskFormComponent implements OnInit{
 
  @Input() projectId!: number;


  ngOnInit(): void {
    console.log(this.projectId);
  }

 }
