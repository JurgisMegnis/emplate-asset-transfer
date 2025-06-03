import { Component, input } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  imports: [],
  templateUrl: './secondary-button.component.html',
  styleUrl: './secondary-button.component.scss'
})
export class SecondaryButtonComponent {
  label = input<string>();
  icon = input<string>();
  hidden = input<boolean>();
}
