import { Component, input } from '@angular/core';

@Component({
  selector: 'app-text-input',
  imports: [],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  label = input<string>("Label placeholder");
  placeholder = input<string>("Placeholder placeholder");
}
