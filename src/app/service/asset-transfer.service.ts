import { Injectable, signal } from '@angular/core';
import { AssetTransferData } from '../models/asset-transfer-data.model';
import { StepsService } from './steps.service';
import { Step } from '../models/step.model';

type FormInputType = FileList | string | null;

@Injectable({
  providedIn: 'root'
})
export class AssetTransferService {
  public formFileUploadSignal = signal<File[]>([]);
  public formInputSignal = signal<string[]>([])

  inputValues: AssetTransferData = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: []
  }

  constructor(private stepsService: StepsService) {}

  updateFormValue(value: FormInputType) {
    const activeStepIndex: number = this.stepsService.activeStepIndexSignal();

    if (value === null) {
      return
    } else if (value instanceof FileList) {
      // Update the formFileUploadSignal with the latest file selection
      this.formFileUploadSignal.update(current => [
        ...current,
        ...Array.from(value)
      ]);
    } else if (activeStepIndex === 3) {
      // Update the step with two color inputs to update the signal with multiple vaues
      this.formInputSignal.update(current => [
        ...current,
        ...[value]
      ]);

      if (this.formInputSignal().length > 2) {
        // If there are already 2 color values and user wants to add two new, remove the initial values
        this.formInputSignal().splice(0, 2);
      }

    } else {
      // Update the step with a single input
      this.formInputSignal.set([value])
    }
  }

  submitFormValue() {
    const activeStepIndex: number = this.stepsService.activeStepIndexSignal();
    const prevStepIndex: number = activeStepIndex - 1;
    const previousStep = this.stepsService.previousStepSignal();
    
    if (prevStepIndex >= 0) {
        // Use the step index to determine the type
      if (prevStepIndex === 0 || prevStepIndex === 3) {
        // These steps expect string[]
        (this.inputValues[prevStepIndex as keyof AssetTransferData] as string[]) = this.formInputSignal();

        // Update the value for text inputs to populate an input if user wants to get back to it
        if (previousStep?.componentInputs) {
          previousStep.componentInputs['currentValue'] = [...this.formInputSignal()];
        }

      } else {
        // All other steps expect File[]
        (this.inputValues[prevStepIndex as keyof AssetTransferData] as File[]) = this.formFileUploadSignal();
      }
    }
  }

  submitFormValueOnBack() {
    const activeStepIndex: number = this.stepsService.activeStepIndexSignal();
    const nextStepIndex: number = activeStepIndex + 1;
    const nextStep = this.stepsService.nextStepSignal();
    
    if (nextStepIndex >= 0) {
        // Use the step index to determine the type
      if (nextStepIndex === 0 || nextStepIndex === 3) {
        // These steps expect string[]
        (this.inputValues[nextStepIndex as keyof AssetTransferData] as string[]) = this.formInputSignal();

        // Update the value for text inputs to populate an input if user wants to get back to it
        if (nextStep?.componentInputs) {
          nextStep.componentInputs['currentValue'] = [...this.formInputSignal()];
        }

      } else {
        // All other steps expect File[]
        (this.inputValues[nextStepIndex as keyof AssetTransferData] as File[]) = this.formFileUploadSignal();
      }
    }
  }

  removeFormValue(index: number) {
    this.formFileUploadSignal.update(current => {
      current.splice(index, 1)
      return current
    })
  }

  loadStepData() {
     const activeStepIndex: number = this.stepsService.activeStepIndexSignal();

     if (activeStepIndex >= 0) {
      if (activeStepIndex === 0 || activeStepIndex === 3) {
        this.formInputSignal.set(this.inputValues[activeStepIndex] as string[]);
      } else {
        this.formFileUploadSignal.set(this.inputValues[activeStepIndex as keyof AssetTransferData] as File[]);
      }
    }
  }

}
