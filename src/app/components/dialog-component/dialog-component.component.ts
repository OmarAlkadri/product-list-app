import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogClose,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface DialogData {
  title: string;
  content: string;
  actions?: DialogAction[];
}

export interface DialogAction {
  label: string;
  value: any; // Use a value to indicate the action result
  color?: 'primary' | 'accent' | 'warn'; // Optional material color
}



@Component({
  selector: 'app-dialog-component',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-component.component.html',
  styleUrl: './dialog-component.component.css'
})
export class DialogComponentComponent {

  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}