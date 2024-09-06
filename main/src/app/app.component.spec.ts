import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef, Renderer2, WritableSignal } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { StoreServiceFacade } from './store/store-facade.service';
import { MatChipsModule } from '@angular/material/chips';
import { WashingMachineCardComponent } from './components/washing-machine-card/washing-machine-card.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { signal, Signal } from '@angular/core';
import { Location, Machine } from './app.model';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStoreServiceFacade: Partial<StoreServiceFacade>;
  let mockRenderer: Partial<Renderer2>;
  let mockElementRef: ElementRef<HTMLDivElement>;

  beforeEach(async () => {
    mockStoreServiceFacade = {
      machines: signal([] as Machine[]),
      locations: signal([] as Location[]),
      totalMachines: signal(0),
      onlineMachines: signal(0),
      offlineMachines: signal(0),
      maintenanceMachines: signal(0),
      dispatchWashingMachines: jest.fn(),
      dispatchLocations: jest.fn(),
      dispatchEditMachine: jest.fn(),
      dispatchDeleteMachine: jest.fn(),
    };

    mockRenderer = {
      listen: jest.fn(),
      addClass: jest.fn(),
      removeClass: jest.fn(),
    } as Partial<Renderer2>;

    mockElementRef = {
      nativeElement: {
        scrollBy: jest.fn(),
      },
    } as unknown as ElementRef<HTMLDivElement>;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatChipsModule,
        WashingMachineCardComponent,
        HeaderComponent,
        HttpClientTestingModule,
      ],
      providers: [
        AppService,
        { provide: StoreServiceFacade, useValue: mockStoreServiceFacade },
        { provide: Renderer2, useValue: mockRenderer },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    component.cardListWrapper = mockElementRef;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call appService.getMachines on init', () => {
    const appService = TestBed.inject(AppService);
    jest.spyOn(appService, 'getMachines').mockReturnValue(of([]));

    component.ngOnInit();

    expect(appService.getMachines).toHaveBeenCalled();
  });

  it('should call appService.getLocations on init', () => {
    const appService = TestBed.inject(AppService);
    jest.spyOn(appService, 'getLocations').mockReturnValue(of([]));

    component.ngOnInit();

    expect(appService.getLocations).toHaveBeenCalled();
  });

  it('should update selectedLocation when onLocationChange is called', () => {
    const mockEvent = { value: 'Location 1' } as any;
    const location: Location = { id: 1, name: 'Location 1' };

    (mockStoreServiceFacade.locations as WritableSignal<Location[]>).set([
      location,
    ]);

    component.onLocationChange(mockEvent);

    expect(component.selectedLocation()).toEqual(location);
  });

  it('should set the currentClientWidth on window resize', () => {
    const resizeEvent = new Event('resize');
    Object.defineProperty(resizeEvent, 'currentTarget', {
      value: { innerWidth: 500 },
    });

    window.dispatchEvent(resizeEvent);
    expect(component.currentClientWidth()).toBe(500);
  });

  it('should set location by machine', () => {
    const location: Location = { id: 1, name: 'Location 1' };

    (mockStoreServiceFacade.locations as WritableSignal<Location[]>).set([
      location,
    ]);

    const locationByMachineLocationId = component.selectLocationByMachine(
      location.id
    );

    expect(locationByMachineLocationId).toEqual(location);
  });

  it('should scroll left when direction is "left"', () => {
    component.scroll('left');
    expect(
      mockElementRef.nativeElement.scrollBy as unknown
    ).toHaveBeenCalledWith({
      left: -150,
      behavior: 'smooth',
    } as ScrollToOptions);

    expect(mockElementRef.nativeElement.scrollBy).toHaveBeenCalled();
  });

  it('should scroll right when direction is "right"', () => {
    component.scroll('right');
    expect(
      mockElementRef.nativeElement.scrollBy as unknown
    ).toHaveBeenCalledWith({
      left: 150,
      behavior: 'smooth',
    } as ScrollToOptions);

    expect(mockElementRef.nativeElement.scrollBy).toHaveBeenCalled();
  });

  it('should call onScroll after timeout', () => {
    jest.useFakeTimers();
    const onScrollSpy = jest.spyOn(component, 'onScroll');

    component.scroll('right');

    jest.advanceTimersByTime(300);

    expect(onScrollSpy).toHaveBeenCalled();

    jest.useRealTimers();
  });
});
