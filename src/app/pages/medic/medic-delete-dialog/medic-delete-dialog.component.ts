import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-medic-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './medic-delete-dialog.component.html',
  styleUrl: './medic-delete-dialog.component.css'
})
export class MedicDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<MedicDeleteDialogComponent>) {}
  onConfirm(): void {
    this.dialogRef.close(true); // Cierra el diálogo y emite true
  }

  onCancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo y emite false
  }

}
