import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exam-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './exam-delete-dialog.component.html',
  styleUrl: './exam-delete-dialog.component.css'
})
export class ExamDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<ExamDeleteDialogComponent>) {}
  onConfirm(): void {
    this.dialogRef.close(true); // Cierra el diálogo y emite true
  }

  onCancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo y emite false
  }
}
