import { Component } from '@angular/core';
import { StepperComponent } from '../stepper/stepper.component';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';
import { StepsService } from '../../../service/steps.service';

@Component({
  selector: 'app-home',
  imports: [StepperComponent, PrimaryButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public stepsService: StepsService) {
  }
}
