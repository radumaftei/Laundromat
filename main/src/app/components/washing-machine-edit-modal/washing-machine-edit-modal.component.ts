import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Machine } from '../../app.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatOptionModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { EditMachineModel } from './edit.model';

@Component({
  selector: 'app-washing-machine-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule,
    MatSelectModule,
    MatError,
    MatInputModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './washing-machine-edit-modal.component.html',
  styleUrl: './washing-machine-edit-modal.component.scss',
})
export class WashingMachineEditModalComponent implements OnInit {
  editMachineForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<WashingMachineEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public machine: Machine,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editMachineForm = this.fb.group({
      name: [this.machine.name, Validators.required],
      modelNumber: [this.machine.modelNumber, Validators.required],
      status: [this.machine.status, Validators.required],
      installationDate: [this.machine.installationDate, Validators.required],
      lastMaintenanceDate: [
        this.machine.lastMaintenanceDate,
        Validators.required,
      ],
      loadCapacity: [
        this.machine.loadCapacity,
        [Validators.required, Validators.min(0)],
      ],
      usageCount: [
        this.machine.usageCount,
        [Validators.required, Validators.min(0)],
      ],
      isUnderWarranty: [this.machine.isUnderWarranty, Validators.required],
    });
  }

  close(closeOption: 'cancel' | 'save') {
    this.dialogRef.close({
      result: closeOption,
      id: this.machine.id,
      newMachine: this.editMachineForm.value,
    } as EditMachineModel);
  }
}
