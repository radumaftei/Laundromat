import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WashingMachineEditModalComponent } from './washing-machine-edit-modal.component';

describe('WashingMachineEditModalComponent', () => {
  let component: WashingMachineEditModalComponent;
  let fixture: ComponentFixture<WashingMachineEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WashingMachineEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WashingMachineEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
