import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Machine } from '../../app.model';
import { WashingMachineDeleteModalComponent } from '../washing-machine-delete-modal/washing-machine-delete-modal.component';
import { WashingMachineEditModalComponent } from '../washing-machine-edit-modal/washing-machine-edit-modal.component';

import { Subscription } from 'rxjs';
import { StoreServiceFacade } from '../../store/store-facade.service';
import { DeleteMachineModel } from '../washing-machine-delete-modal/delete.model';
import { EditMachineModel } from '../washing-machine-edit-modal/edit.model';

@Component({
  selector: 'app-washing-machine-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './washing-machine-card.component.html',
  styleUrl: './washing-machine-card.component.scss',
})
export class WashingMachineCardComponent implements OnDestroy {
  private readonly subscription = new Subscription();
  private readonly dialog = inject(MatDialog);
  private readonly storeServiceFacade = inject(StoreServiceFacade);
  @Input() machine!: Machine;

  editMachine() {
    const dialogRef = this.dialog.open(WashingMachineEditModalComponent, {
      minWidth: '80vw',
      data: this.machine,
      disableClose: true,
    });

    this.subscription.add(
      dialogRef.beforeClosed().subscribe((data: EditMachineModel) => {
        if (data?.result === 'save' && data.id && data.newMachine) {
          this.storeServiceFacade.dispatchEditMachine(data.id, data.newMachine);
        }
      })
    );
  }

  deleteMachine() {
    const dialogRef = this.dialog.open(WashingMachineDeleteModalComponent, {
      minWidth: '80vw',
      data: this.machine.id,
    });

    this.subscription.add(
      dialogRef.beforeClosed().subscribe((data: DeleteMachineModel) => {
        if (data?.result === 'ok' && data.id) {
          this.storeServiceFacade.dispatchDeleteMachine(data.id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
