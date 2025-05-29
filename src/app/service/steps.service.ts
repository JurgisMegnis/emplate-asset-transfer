import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Step } from '../models/step.model';
import { STEPS } from '../data/steps-data';

@Injectable({
  providedIn: 'root'
})
export class StepsService {
  private stepsSignal: WritableSignal<Step[]> = signal<Step[]>([...STEPS]);
  public steps: Signal<Step[]> = this.stepsSignal.asReadonly();
  
  // Signal with the currently active step
  public activeStepSignal: Signal<Step | undefined> = computed(() => 
    this.stepsSignal().find(step => step.active)
  );

  // Signal with the index of the currently active step 
  public activeStepIndexSignal: Signal<number> = computed(() => 
    this.stepsSignal().findIndex(step => step.id === this.activeStepSignal()?.id)
  );

  // Signal with the previous step
  public previousStepSignal: Signal<Step | undefined> = computed(() => {
    const prevIndex = this.activeStepIndexSignal() - 1;
    if (prevIndex >= 0) {
        return this.stepsSignal()[prevIndex];
    }
    return undefined;
  });

  // Signal with the next step
  public nextStepSignal: Signal<Step | undefined> = computed(() => {
    const nextIndex = this.activeStepIndexSignal() + 1;
    if (nextIndex >= 0) {
        return this.stepsSignal()[nextIndex];
    }
    return undefined;
  });
  
  constructor() { }
  
  // Update the step item status
  nextStep() {
    if (this.activeStepIndexSignal() < this.stepsSignal().length - 1) {
      // Calculate the next index
      const nextStepIndex: number = this.activeStepIndexSignal() + 1;

      // Get ID if the next step
      const nextStepId: string = this.stepsSignal()[nextStepIndex].id;

      // Update the steps
      this.stepsSignal.update(steps =>
        steps.map(step => {
          if (step.id === this.activeStepSignal()?.id) {
            return { ...step, active: false, completed: true };
          } else if (step.id === nextStepId) {
            return { ...step, active: true };
          } else {
            return step;
          }
        })
      );
    }
  }

  previousStep() {
    if (this.activeStepIndexSignal() > 0) {
      // Calculate the previous index
      const prevStepIndex: number = this.activeStepIndexSignal() - 1;

      // Get ID of the previous step
      const prevStepId: string = this.stepsSignal()[prevStepIndex].id;

      // Update the steps
      this.stepsSignal.update(steps =>
        steps.map(step => {
          if (step.id === this.activeStepSignal()?.id) {
            return { ...step, active: false };
          } else if (step.id === prevStepId) {
            return { ...step, active: true, completed: false };
          } else {
            return step;
          }
        })
      );
    }
  }
}

