import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import {
  WashingMachinesState,
  WashingMachinesStateModel,
} from './washing-machines.state';
import * as Actions from './washing-machines.actions';
import { Machine } from '../../app.model';

describe('WashingMachinesState', () => {
  let store: Store;

  const initialMachines: Machine[] = [
    {
      id: 1,
      name: 'Machine 1',
      locationId: 101,
      modelNumber: 'M1',
      status: 'online',
      installationDate: new Date('2023-01-01'),
      lastMaintenanceDate: new Date('2023-06-01'),
      maintenanceIntervalDays: 180,
      loadCapacity: 10,
      usageCount: 5,
      isUnderWarranty: true,
    },
    {
      id: 2,
      name: 'Machine 2',
      locationId: 102,
      modelNumber: 'M2',
      status: 'offline',
      installationDate: new Date('2022-01-01'),
      lastMaintenanceDate: new Date('2023-05-01'),
      maintenanceIntervalDays: 365,
      loadCapacity: 15,
      usageCount: 10,
      isUnderWarranty: false,
    },
    {
      id: 3,
      name: 'Machine 3',
      locationId: 103,
      modelNumber: 'M3',
      status: 'maintenance',
      installationDate: new Date('2021-01-01'),
      lastMaintenanceDate: new Date('2023-04-01'),
      maintenanceIntervalDays: 90,
      loadCapacity: 20,
      usageCount: 8,
      isUnderWarranty: true,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([WashingMachinesState])],
    });

    store = TestBed.inject(Store);
  });

  it('should set washing machines correctly with SetWashingMachines action', () => {
    store.dispatch(new Actions.SetWashingMachines(initialMachines));
    const machines = store.selectSnapshot(WashingMachinesState.getMachines);
    expect(machines).toEqual(initialMachines);
  });

  it('should edit a washing machine with EditWashingMachine action', () => {
    store.dispatch(new Actions.SetWashingMachines(initialMachines));
    store.dispatch(
      new Actions.EditWashingMachine({
        id: 1,
        newMachine: {
          name: 'Updated Machine 1',
          status: 'offline',
          modelNumber: 'M1-updated',
          installationDate: new Date(),
          lastMaintenanceDate: new Date(),
          loadCapacity: 15,
          usageCount: 6,
          isUnderWarranty: false,
          locationId: 1,
          maintenanceIntervalDays: 110,
        } as Machine,
      })
    );
    const machines = store.selectSnapshot(WashingMachinesState.getMachines);
    expect(machines[0].name).toBe('Updated Machine 1');
    expect(machines[0].status).toBe('offline');
  });

  it('should delete a washing machine with DeleteWashingMachine action', () => {
    store.dispatch(new Actions.SetWashingMachines(initialMachines));
    store.dispatch(new Actions.DeleteWashingMachine(1));
    const machines = store.selectSnapshot(WashingMachinesState.getMachines);
    expect(machines.length).toBe(2);
    expect(machines.find((machine) => machine.id === 1)).toBeUndefined();
  });

  it('should return the total number of machines', () => {
    store.dispatch(new Actions.SetWashingMachines(initialMachines));
    const totalMachines = store.selectSnapshot(
      WashingMachinesState.getTotalMachines
    );
    expect(totalMachines).toBe(3);
  });

  it('should return the total number of online machines', () => {
    store.dispatch(new Actions.SetWashingMachines(initialMachines));
    const totalOnlineMachines = store.selectSnapshot(
      WashingMachinesState.getTotalOnlineMachines
    );
    expect(totalOnlineMachines).toBe(1);
  });

  it('should return the total number of offline machines', () => {
    store.dispatch(new Actions.SetWashingMachines(initialMachines));
    const totalOfflineMachines = store.selectSnapshot(
      WashingMachinesState.getTotalOfflineMachines
    );

    expect(totalOfflineMachines).toBe(1);
  });

  it('should return the total number of machines under maintenance', () => {
    store.dispatch(new Actions.SetWashingMachines(initialMachines));
    const totalUnderMaintenanceMachines = store.selectSnapshot(
      WashingMachinesState.getTotalUnderMaintenanceMachines
    );
    expect(totalUnderMaintenanceMachines).toBe(1);
  });
});
