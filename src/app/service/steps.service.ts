import { Injectable, signal } from '@angular/core';
import { Step } from '../data/step.model';
import { STEPS } from '../data/steps-data';

@Injectable({
  providedIn: 'root'
})
export class StepsService {
  private stepsSignal = signal<Step[]>([...STEPS]);

  public steps = this.stepsSignal.asReadonly();

  constructor() { }
  
  nextStep() {
    // Find currently active step
    const activeStep: Step | undefined = this.stepsSignal().find(step => step.active);

    if(!activeStep) {
      return
    }
    
    // Find the index if the active step
    const activeStepIndex: number | undefined = this.stepsSignal().findIndex(step => step.id === activeStep.id);

    // Calculate the next index (avoid getting out of bounds)
    const nextStepIndex: number = Math.min(activeStepIndex + 1, this.stepsSignal().length - 1);

    // Get ID if the next step
    const nextStepId: string = this.stepsSignal()[nextStepIndex].id;

    // Update the steps
    this.stepsSignal.update(steps =>
      steps.map(step => {
        if (step.id === activeStep.id) {
          return { ...step, active: false };
        } else if (step.id === nextStepId) {
          return { ...step, active: true };
        } else {
          return step;
        }
      })
    );

    console.log(activeStepIndex);
  }
}

