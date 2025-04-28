import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-step-item',
  imports: [],
  templateUrl: './step-item.component.html',
  styleUrl: './step-item.component.scss'
})
export class StepItemComponent {
  id = input<string>();
  iconIdle = input<string>();
  iconActive = input<string>();
  title = input<string>();
  description = input<string>();
  required = input<boolean>();
  active = input<boolean>();
  completed = input<boolean>();
}
