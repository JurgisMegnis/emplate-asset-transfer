import { Component, OnInit } from '@angular/core';
import { StepsService } from '../../../service/steps.service';
import { Step } from '../../../data/step.model';
import { StepItemComponent } from '../../ui/step-item/step-item.component';

@Component({
  selector: 'app-stepper',
  imports: [StepItemComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnInit {
  steps: Step[] = [];

  constructor(public stepsService: StepsService) {}

  ngOnInit(): void {
    this.steps = this.stepsService.steps();
  }
}
