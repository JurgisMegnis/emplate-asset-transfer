import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileFormService {
  private formValueSignal = signal<FileList | null>(null);

  updateFormValue(value: FileList | null) {
    this.formValueSignal.set(value);
  }

  getFormValue() {
    return this.formValueSignal();
  }
}
