import { Component, Type, OnInit, Signal, input } from '@angular/core';
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
export class ContentPanelComponent implements OnInit {
  // Get the active step
  private activeStep: Step | undefined;

  // Components array that contains input component classes that are necessary for the currently active step
  protected components: Type<DynamicComponent>[] | null = null;

  protected componentData: ComponentDataType[] | null = null;

  // Registry that maps component strings (from the data source) to their corresponding component classes
  private componentMap: Record<string, Type<DynamicComponent>> = {
    'TextInputComponent': TextInputComponent,
    'FileUploadComponent': FileUploadComponent
  };

  constructor(public stepsService: StepsService, private fileFormService: FileFormService ) {}

  ngOnInit(): void {
    // Get the currently active step
    this.activeStep = this.stepsService.activeStepSignal();
    // Early return if there is no active step
    if (!this.activeStep) {return}

    // Pass the input component classes that are necessary for the currently active step to the components array
    this.components = this.activeStep.components
      .map(item => this.componentMap[item as keyof typeof this.componentMap])
      .filter((component): component is Type<DynamicComponent> => component !== undefined) || null;

    this.componentData = this.components?.map((item, index) => {
      let inputConfig: Record<string, string>;

      if (item === TextInputComponent) {
        const labelValue = this.activeStep?.componentInputs?.['label']?.[index] || '';
        const placeholderValue = this.activeStep?.componentInputs?.['placeholder']?.[index] || '';

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
    }) || null
  }

  // Pass the input component classes that are necessary for the currently active step to the components array
  protected dynamicComponentAssign() {
    // Get the currently active step
    this.activeStep = this.stepsService.activeStepSignal();
    // Early return if there is no active step
    if (!this.activeStep) {return}

    // Pass the input component classes that are necessary for the currently active step to the components array
    this.components = this.activeStep.components
      .map(item => this.componentMap[item as keyof typeof this.componentMap])
      .filter((component): component is Type<DynamicComponent> => component !== undefined) || null;

    this.componentData = this.components?.map((item, index) => {
      let inputConfig: Record<string, string>;

      if (item === TextInputComponent) {
        const labelValue = this.activeStep?.componentInputs?.['label']?.[index] || '';
        const placeholderValue = this.activeStep?.componentInputs?.['placeholder']?.[index] || '';

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
    }) || null
  }

  submitForm() {
    const currentValue = this.fileFormService.getFormValue();
    console.log(currentValue)
  }
}
