import { Component } from '@angular/core';
import { STEPS } from '../../../data/steps-data';
import { StepItemComponent } from '../../ui/step-item/step-item.component';

@Component({
  selector: 'app-stepper',
  imports: [StepItemComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {
  steps = STEPS;
}
