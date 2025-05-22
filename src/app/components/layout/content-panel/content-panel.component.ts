import { Component, Type, Signal, input, computed } from '@angular/core';
import { StepsService } from '../../../service/steps.service';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../ui/secondary-button/secondary-button.component';
import { NgComponentOutlet } from '@angular/common';
import { TextInputComponent } from '../../ui/text-input/text-input.component';
import { FileUploadComponent } from '../../ui/file-upload/file-upload.component';
import { FileFormService } from '../../../service/file-form.service';
import { Step } from '../../../data/step.model';


// Union type with all of the possible components
type DynamicComponent = TextInputComponent | FileUploadComponent;
type ComponentDataType = {type: Type<DynamicComponent>, inputs: Record<string, string>};

@Component({
  selector: 'app-content-panel',
  imports: [
    PrimaryButtonComponent, 
    SecondaryButtonComponent,
    NgComponentOutlet,
  ],
  templateUrl: './content-panel.component.html',
  styleUrl: './content-panel.component.scss'
})
export class ContentPanelComponent {
  // A signal tracking the currently active step
  protected activeStep: Signal <Step | undefined> = computed(() => this.stepsService.activeStepSignal())
  // A signal that updates with activeStep changes rendering the necessary data
  protected componentData: Signal<ComponentDataType[] | null> = computed(() => this.newComponentDataObj(this.activeStep()))

  constructor(public stepsService: StepsService, private fileFormService: FileFormService ) {}

   // Registry that maps component strings (from the data source) to their corresponding component classes
  private componentMap: Record<string, Type<DynamicComponent>> = {
    'TextInputComponent': TextInputComponent,
    'FileUploadComponent': FileUploadComponent
  };

  // Takes the currently active step data and creates the relevant data object for the component
  private newComponentDataObj(activeStep: Step | undefined): ComponentDataType[] | null {
    if (!activeStep) {return null}

    const components: Type<DynamicComponent>[] = activeStep.components
      .map(item => this.componentMap[item as keyof typeof this.componentMap])
      .filter((component): component is Type<DynamicComponent> => component !== undefined);

    if (!components?.length) {
      return null;
    }

    return components.map((item, index) => {
      let inputConfig: Record<string, string>;

      if (item === TextInputComponent) {
        const labelValue = activeStep.componentInputs?.['label']?.[index] || '';
        const placeholderValue = activeStep.componentInputs?.['placeholder']?.[index] || '';

        inputConfig = {
          label: labelValue,
          placeholder: placeholderValue
        };
      } else {
        inputConfig = {};
      }

      return {
        type: item,
        inputs: inputConfig
      }
    });
  }

  submitForm() {
    const currentValue = this.fileFormService.getFormValue();
    console.log(currentValue)
  }

  handleStepChange(isNext: boolean) {
    if (isNext) {
      this.stepsService.nextStep();
      this.submitForm();
    } else {
      this.stepsService.previousStep()
    }
  }
}
