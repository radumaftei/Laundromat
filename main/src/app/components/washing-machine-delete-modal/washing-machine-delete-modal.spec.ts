import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { WashingMachineDeleteModalComponent } from './washing-machine-delete-modal.component';
import { Location, Machine } from '../../app.model';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

describe('WashingMachineDeleteModalComponent', () => {
  let component: WashingMachineDeleteModalComponent;
  let fixture: ComponentFixture<WashingMachineDeleteModalComponent>;
  let dialogRef: jest.Mocked<
    Partial<MatDialogRef<WashingMachineDeleteModalComponent>>
  >;
  let mockData: { machine: Machine; location?: Location };

  beforeEach(async () => {
    mockData = {
      machine: {
        id: 1,
        name: 'Test Machine',
        modelNumber: 'TM123',
        status: 'online',
        installationDate: new Date(),
        lastMaintenanceDate: new Date(),
        loadCapacity: 10,
        usageCount: 100,
        isUnderWarranty: true,
        locationId: 4,
        maintenanceIntervalDays: 19,
      },
    };

    dialogRef = {
      close: jest.fn(),
    } as jest.Mocked<Partial<MatDialogRef<WashingMachineDeleteModalComponent>>>;

    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogTitle,
        MatDialogContent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WashingMachineDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with "no" result', () => {
    component.close('no');
    expect(dialogRef.close).toHaveBeenCalledWith({
      result: 'no',
      id: undefined,
    });
  });

  it('should close the dialog with "ok" result and machine id', () => {
    component.close('ok');
    expect(dialogRef.close).toHaveBeenCalledWith({
      result: 'ok',
      id: mockData.machine.id,
    });
  });
});
