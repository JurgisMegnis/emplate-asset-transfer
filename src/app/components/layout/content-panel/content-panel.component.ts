import { Component, Type, OnInit } from '@angular/core';
import { StepsService } from '../../../service/steps.service';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../ui/secondary-button/secondary-button.component';
import { NgComponentOutlet } from '@angular/common';
import { TextInputComponent } from '../../ui/text-input/text-input.component';
import { FileUploadComponent } from '../../ui/file-upload/file-upload.component';
import { FileFormService } from '../../../service/file-form.service';

// Union type with all of the possible components
type DynamicComponent = TextInputComponent | FileUploadComponent;

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
  // Components array that contains input component classes that are necessary for the currently active step
  protected components: Type<DynamicComponent>[] | null = null;

  // Registry that maps component strings (from the data source) to their corresponding component classes
  private componentMap: Record<string, Type<DynamicComponent>> = {
    'TextInputComponent': TextInputComponent,
    'FileUploadComponent': FileUploadComponent
  };

  constructor(public stepsService: StepsService, private fileFormService: FileFormService ) {}

  ngOnInit(): void {
    // Pass the input component classes that are necessary for the currently active step to the components array
    this.components = this.stepsService.activeStepSignal()?.dataInputComponents
      .map(item => this.componentMap[item as keyof typeof this.componentMap])
      .filter((component): component is Type<DynamicComponent> => component !== undefined) || null;
  }

  // Pass the input component classes that are necessary for the currently active step to the components array
  protected dynamicComponentAssign() {
    this.components = this.stepsService.activeStepSignal()?.dataInputComponents
      .map(item => this.componentMap[item as keyof typeof this.componentMap])
      .filter((component): component is Type<DynamicComponent> => component !== undefined) || null;
  }

  submitForm() {
    const currentValue = this.fileFormService.getFormValue();
    console.log(currentValue)
  }
}
