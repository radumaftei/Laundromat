import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import * as WashingMachinesActions from './machines/washing-machines.actions';
import * as LocationActions from './locations/location.actions';
import { Machine } from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class StoreServiceFacade {
  private readonly store = inject(Store);

  dispatchWashingMachines(machines: Machine[]) {
    this.store.dispatch(
      new WashingMachinesActions.WashingMachinesAction(machines)
    );
  }

  dispatchEditMachine(id: number, newMachine: Omit<Machine, 'id'>) {
    this.store.dispatch(
      new WashingMachinesActions.WashingMachinesEditAction({
        id,
        newMachine,
      })
    );
  }

  dispatchDeleteMachine(id: number) {
    this.store.dispatch(
      new WashingMachinesActions.WashingMachinesDeleteAction(id)
    );
  }
}
