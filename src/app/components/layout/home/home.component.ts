import { Component } from '@angular/core';
import { StepperComponent } from '../stepper/stepper.component';
import { StepsService } from '../../../service/steps.service';
import { ContentPanelComponent } from '../content-panel/content-panel.component';

@Component({
  selector: 'app-home',
  imports: [StepperComponent, ContentPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public stepsService: StepsService) {
  }
}
