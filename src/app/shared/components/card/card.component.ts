import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent { 
  
  @Input() title!: string;
  @Input() text!: string;
  @Input() button1Label!: string;
  @Input() button2Label?: string;
  @Output() button1Click = new EventEmitter();
  @Output() button2Click = new EventEmitter();
}
