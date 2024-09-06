import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Location, Machine } from '../app.model';
import { StoreServiceFacade } from './store-facade.service';

import * as LocationActions from './locations/location.actions';
import * as WashingMachinesActions from './machines/washing-machines.actions';

describe('StoreFacadeService', () => {
  let store: Store;
  let service: StoreServiceFacade;

  const machine: Machine = {
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
  };

  const location: Location = {
    id: 1,
    name: 'Location 1',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()],
      providers: [StoreServiceFacade],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(StoreServiceFacade);

    jest.spyOn(store, 'dispatch');
  });

  it('should create StoreFacadeService', () => {
    expect(service).toBeTruthy();
  });

  it('should call dispatchWashingMachines with arguments and dispatch', () => {
    service.dispatchWashingMachines([machine]);

    expect(store.dispatch).toHaveBeenCalledWith(
      new WashingMachinesActions.SetWashingMachines([machine])
    );
  });

  it('should call dispatchLocations with arguments and dispatch', () => {
    service.dispatchLocations([location]);

    expect(store.dispatch).toHaveBeenCalledWith(
      new LocationActions.LocationAction([location])
    );
  });

  it('should call dispatchEditMachine with arguments and dispatch', () => {
    service.dispatchEditMachine(1, machine);

    expect(store.dispatch).toHaveBeenCalledWith(
      new WashingMachinesActions.EditWashingMachine({
        id: 1,
        newMachine: machine,
      })
    );
  });

  it('should call dispatchDeleteMachine with arguments and dispatch', () => {
    service.dispatchDeleteMachine(1);

    expect(store.dispatch).toHaveBeenCalledWith(
      new WashingMachinesActions.DeleteWashingMachine(1)
    );
  });
});
