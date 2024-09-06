import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { Location, Machine } from '../../app.model';
import { StoreServiceFacade } from '../../store/store-facade.service';
import { WashingMachineCardComponent } from './washing-machine-card.component';

describe('WashingMachineCardComponent', () => {
  let component: WashingMachineCardComponent;
  let fixture: ComponentFixture<WashingMachineCardComponent>;
  let mockDialog: jest.Mocked<Partial<MatDialog>>;
  let mockDialogRef: jest.Mocked<Partial<MatDialogRef<any>>>;
  let mockStoreServiceFacade: jest.Mocked<Partial<StoreServiceFacade>>;
  let mockMachine: Machine;
  let mockLocation: Location;
  let beforeCloseSubject: Subject<any>;

  beforeEach(async () => {
    mockMachine = {
      id: 1,
      name: 'Test Machine',
      modelNumber: 'TM123',
      status: 'online',
      installationDate: new Date(),
      lastMaintenanceDate: new Date(),
      loadCapacity: 10,
      usageCount: 100,
      isUnderWarranty: true,
      locationId: 2,
      maintenanceIntervalDays: 23,
    };

    mockLocation = {
      id: 1,
      name: 'Test Location',
    };

    beforeCloseSubject = new Subject<any>();

    mockDialogRef = {
      close: jest.fn(),
      beforeClosed: jest.fn(() => beforeCloseSubject.asObservable()),
    } as jest.Mocked<Partial<MatDialogRef<any>>>;

    mockDialog = {
      open: jest.fn().mockReturnValue(mockDialogRef),
    } as jest.Mocked<Partial<MatDialog>>;

    mockStoreServiceFacade = {
      dispatchEditMachine: jest.fn(),
      dispatchDeleteMachine: jest.fn(),
    } as jest.Mocked<Partial<StoreServiceFacade>>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: StoreServiceFacade, useValue: mockStoreServiceFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WashingMachineCardComponent);
    component = fixture.componentInstance;
    component.machine = mockMachine;
    component.location = mockLocation;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open edit dialog and dispatch edit action on save', () => {
    component.editMachine();
    expect(mockDialog.open).toHaveBeenCalled();
    beforeCloseSubject.next({
      result: 'save',
      id: mockMachine.id,
      newMachine: mockMachine,
    });
    expect(mockStoreServiceFacade.dispatchEditMachine).toHaveBeenCalledWith(
      mockMachine.id,
      mockMachine
    );
  });

  it('should open delete dialog and dispatch delete action on confirm', () => {
    component.deleteMachine();
    expect(mockDialog.open).toHaveBeenCalled();
    beforeCloseSubject.next({ result: 'ok', id: mockMachine.id });
    expect(mockStoreServiceFacade.dispatchDeleteMachine).toHaveBeenCalledWith(
      mockMachine.id
    );
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
