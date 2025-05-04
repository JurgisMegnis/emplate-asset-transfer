import { Component, Type, OnInit } from '@angular/core';
import { StepsService } from '../../../service/steps.service';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../ui/secondary-button/secondary-button.component';
import { NgComponentOutlet } from '@angular/common';
import { TextInputComponent } from '../../ui/text-input/text-input.component';
import { FileUploadComponent } from '../../ui/file-upload/file-upload.component';

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
  protected components: Type<DynamicComponent>[] | null = null;

  private componentMap: Record<string, Type<DynamicComponent>> = {
    'TextInputComponent': TextInputComponent,
    'FileUploadComponent': FileUploadComponent
  };

  constructor(public stepsService: StepsService) {}

  ngOnInit(): void {
    this.components = this.stepsService.activeStepSignal()?.dataInputComponents
      .map(item => this.componentMap[item as keyof typeof this.componentMap])
      .filter((component): component is Type<DynamicComponent> => component !== undefined) || null;
  }

  protected dynamicComponentAssign() {
    this.components = this.stepsService.activeStepSignal()?.dataInputComponents
      .map(item => this.componentMap[item as keyof typeof this.componentMap])
      .filter((component): component is Type<DynamicComponent> => component !== undefined) || null;
  }
}
