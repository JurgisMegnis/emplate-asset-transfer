import { Component, input } from '@angular/core';

@Component({
  selector: 'app-step-item',
  imports: [],
  templateUrl: './step-item.component.html',
  styleUrl: './step-item.component.scss'
})
export class StepItemComponent {
  id = input<string>();
  icon = input<string>();
  title = input<string>();
  description = input<string>();
}
