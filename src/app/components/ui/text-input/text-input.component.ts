import { Component, input, OnInit, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AssetTransferService } from '../../../service/asset-transfer.service';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent implements OnInit {
  @Input() label: string = "Label placeholder";
  @Input() placeholder: string = "Placeholder placeholder";
  @Input() currentValue: string = '';
 
  input = new FormControl<string>('');

  constructor(private assetTransferService: AssetTransferService) {}

  ngOnInit(): void {
    this.input.setValue(this.currentValue)
  }

  onInput(event: Event) {
    const value: string | null = this.input.value;
    if (value) {
      this.assetTransferService.updateFormValue(value)
    }
  }
}
