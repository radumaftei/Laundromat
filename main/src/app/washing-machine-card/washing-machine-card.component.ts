import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Machine } from '../app.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { WashingMachineEditModalComponent } from '../washing-machine-edit-modal/washing-machine-edit-modal.component';
import { WashingMachineDeleteModalComponent } from '../washing-machine-delete-modal/washing-machine-delete-modal.component';

@Component({
  selector: 'app-washing-machine-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './washing-machine-card.component.html',
  styleUrl: './washing-machine-card.component.scss',
})
export class WashingMachineCardComponent {
  private readonly dialog = inject(MatDialog);
  @Input() machine!: Machine;

  editMachine() {
    this.dialog.open(WashingMachineEditModalComponent, {
      minWidth: '80vw',
      data: this.machine,
    });
  }

  deleteMachine() {
    const dialogRef = this.dialog.open(WashingMachineDeleteModalComponent, {
      minWidth: '80vw',
      data: this.machine.id,
    });

    dialogRef.beforeClosed().subscribe((data) => {
      console.log('before', data);
    });
  }
}
