import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import * as WashingMachinesActions from './machines/washing-machines.actions';
import * as LocationActions from './locations/location.actions';
import { Location, Machine } from '../app.model';
import { WashingMachinesState } from './machines/washing-machines.state';
import { LocationState } from './locations/location.state';

@Injectable({
  providedIn: 'root',
})
export class StoreServiceFacade {
  private readonly store = inject(Store);

  readonly machines = this.store.selectSignal(WashingMachinesState.getMachines);
  readonly locations = this.store.selectSignal(LocationState.getLocations);

  readonly totalMachines = this.store.selectSignal(
    WashingMachinesState.getTotalMachines
  );
  readonly onlineMachines = this.store.selectSignal(
    WashingMachinesState.getTotalOnlineMachines
  );
  readonly offlineMachines = this.store.selectSignal(
    WashingMachinesState.getTotalOfflineMachines
  );
  readonly maintenanceMachines = this.store.selectSignal(
    WashingMachinesState.getTotalUnderMaintenanceMachines
  );

  dispatchWashingMachines(machines: Machine[]) {
    this.store.dispatch(
      new WashingMachinesActions.SetWashingMachines(machines)
    );
  }

  dispatchLocations(locations: Location[]) {
    this.store.dispatch(new LocationActions.LocationAction(locations));
  }

  dispatchEditMachine(id: number, newMachine: Omit<Machine, 'id'>) {
    this.store.dispatch(
      new WashingMachinesActions.EditWashingMachine({
        id,
        newMachine,
      })
    );
  }

  dispatchDeleteMachine(id: number) {
    this.store.dispatch(new WashingMachinesActions.DeleteWashingMachine(id));
  }
}
