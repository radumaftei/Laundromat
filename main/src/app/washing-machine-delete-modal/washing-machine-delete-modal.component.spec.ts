import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WashingMachineDeleteModalComponent } from './washing-machine-delete-modal.component';

describe('WashingMachineDeleteModalComponent', () => {
  let component: WashingMachineDeleteModalComponent;
  let fixture: ComponentFixture<WashingMachineDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WashingMachineDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WashingMachineDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
