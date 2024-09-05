import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Location, Machine } from '../../app.model';
import { DeleteMachineModel } from './delete.model';

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
    @Inject(MAT_DIALOG_DATA)
    public data: { machine: Machine; location?: Location }
  ) {}

  close(closeOption: 'no' | 'ok') {
    this.dialogRef.close({
      result: closeOption,
      id: closeOption === 'ok' ? this.data.machine.id : undefined,
    } as DeleteMachineModel);
  }
}
