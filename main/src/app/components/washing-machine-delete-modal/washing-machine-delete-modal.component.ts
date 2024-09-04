import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-washing-machine-delete-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './washing-machine-delete-modal.component.html',
  styleUrl: './washing-machine-delete-modal.component.scss',
})
export class WashingMachineDeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<WashingMachineDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}

  close(closeOption: 'no' | 'ok') {
    this.dialogRef.close({
      result: closeOption,
    });
  }
}
