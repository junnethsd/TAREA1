import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-specialty-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './specialty-delete-dialog.component.html',
  styleUrl: './specialty-delete-dialog.component.css'
})
export class SpecialtyDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<SpecialtyDeleteDialogComponent>) {}
  onConfirm(): void {
    this.dialogRef.close(true); // Cierra el diálogo y emite true
  }

  onCancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo y emite false
  }
}
