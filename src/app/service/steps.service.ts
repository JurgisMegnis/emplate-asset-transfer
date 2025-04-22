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
  
}
