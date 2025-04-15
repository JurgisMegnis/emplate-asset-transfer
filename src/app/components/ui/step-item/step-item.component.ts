import { Component } from '@angular/core';
import { STEPS } from '../../../data/steps-data';

@Component({
  selector: 'app-step-item',
  imports: [],
  templateUrl: './step-item.component.html',
  styleUrl: './step-item.component.scss'
})
export class StepItemComponent {
  steps = STEPS;
}
