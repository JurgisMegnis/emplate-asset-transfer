import { Component, computed, input, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssetTransferService } from '../../../service/asset-transfer.service';

@Component({
  selector: 'app-file-upload',
  imports: [ReactiveFormsModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent  {
  files = new FormControl<FileList | null>(null);
  filesArray: Signal <File[]> = computed(() => this.assetTransferService.formFileUploadSignal())
  dragOver: boolean = false;

  constructor(private assetTransferService: AssetTransferService) {}
  
  // Handle file selection
  onFileSelected(event: Event) {
    const fileList: FileList | null = (event.target as HTMLInputElement).files; 
    if (fileList && fileList.length > 0) {
      this.assetTransferService.updateFormValue(fileList)
    }
  }

  // Handle drag and drop
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
    
    if (event.dataTransfer?.files) {
      const fileList: FileList | null = event.dataTransfer?.files; 
      if (fileList && fileList.length > 0) {
        this.assetTransferService.updateFormValue(fileList)
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = true; 
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
  }

  // Remove the selected file
  remove(index: number): void {
    this.assetTransferService.removeFormValue(index);
  }

  // Convert the file size to the correct format
  sizeConvert(size: number): string {
    const sizeKB = size / 1000
    if (sizeKB >= 1000 && sizeKB < 1000000) {
      return `${(sizeKB / 1000).toFixed(1)} mb`
    } else if (sizeKB >= 1000000) {
      return `${(sizeKB / 1000 / 1000).toFixed(1)} gb`
    } else {
      return `${sizeKB.toFixed(0)} kb`
    }
   }

   // Split the name and extension to display them in two different lines
   fileNameSplit(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    return filename.substring(0, lastDotIndex);
   }

   fileExtensionSplit(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    return filename.substring(lastDotIndex + 1);
   }
}