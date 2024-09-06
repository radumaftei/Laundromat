import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WashingMachineEditModalComponent } from './washing-machine-edit-modal.component';
import { Machine } from '../../app.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WashingMachineEditModalComponent', () => {
  let component: WashingMachineEditModalComponent;
  let fixture: ComponentFixture<WashingMachineEditModalComponent>;
  let dialogRef: jest.Mocked<
    Partial<MatDialogRef<WashingMachineEditModalComponent>>
  >;
  let mockMachineData: Machine;

  beforeEach(async () => {
    mockMachineData = {
      id: 1,
      name: 'Test Machine',
      modelNumber: 'TM123',
      status: 'maintenance',
      installationDate: new Date(),
      lastMaintenanceDate: new Date(),
      loadCapacity: 10,
      usageCount: 100,
      isUnderWarranty: true,
      locationId: 1,
      maintenanceIntervalDays: 32,
    };

    dialogRef = {
      close: jest.fn(),
    } as jest.Mocked<Partial<MatDialogRef<WashingMachineEditModalComponent>>>;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockMachineData },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WashingMachineEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with machine data', () => {
    expect(component.editMachineForm).toBeDefined();
    expect(component.editMachineForm.value).toEqual({
      name: mockMachineData.name,
      modelNumber: mockMachineData.modelNumber,
      status: mockMachineData.status,
      installationDate: mockMachineData.installationDate,
      lastMaintenanceDate: mockMachineData.lastMaintenanceDate,
      loadCapacity: mockMachineData.loadCapacity,
      usageCount: mockMachineData.usageCount,
      isUnderWarranty: mockMachineData.isUnderWarranty,
    });
  });

  it('should close the dialog with cancel result', () => {
    component.close('cancel');
    expect(dialogRef.close).toHaveBeenCalledWith({
      result: 'cancel',
      id: mockMachineData.id,
      newMachine: component.editMachineForm.value,
    });
  });

  it('should close the dialog with save result', () => {
    component.close('save');
    expect(dialogRef.close).toHaveBeenCalledWith({
      result: 'save',
      id: mockMachineData.id,
      newMachine: component.editMachineForm.value,
    });
  });

  it('should validate form fields correctly', () => {
    const form = component.editMachineForm;
    const nameField = form.get('name');
    const loadCapacityField = form.get('loadCapacity');
    const usageCountField = form.get('usageCount');

    expect(nameField?.valid).toBe(true);
    expect(loadCapacityField?.valid).toBe(true);
    expect(usageCountField?.valid).toBe(true);

    nameField?.setValue('');
    loadCapacityField?.setValue(-1);
    usageCountField?.setValue(-1);

    expect(nameField?.valid).toBe(false);
    expect(loadCapacityField?.valid).toBe(false);
    expect(usageCountField?.valid).toBe(false);
  });
});
