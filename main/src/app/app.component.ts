import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  Renderer2,
  signal,
  ViewChild,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Location } from './app.model';
import { AppService } from './app.service';
import { WashingMachineCardComponent } from './components/washing-machine-card/washing-machine-card.component';
import { HeaderComponent } from './header/header.component';
import { StoreServiceFacade } from './store/store-facade.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    WashingMachineCardComponent,
    MatChipsModule,
    HeaderComponent,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  private readonly appService = inject(AppService);
  private readonly storeServiceFacade = inject(StoreServiceFacade);
  private readonly renderer = inject(Renderer2);

  currentClientWidth = signal(0);

  @ViewChild('cardListWrapper', { static: true })
  cardListWrapper!: ElementRef<HTMLDivElement>;

  @ViewChildren(WashingMachineCardComponent)
  washingMachineCards?: QueryList<WashingMachineCardComponent>;

  selectedMachines = computed(() => {
    const selectedLoc = this.selectedLocation();
    if (selectedLoc) {
      return (
        this.machines()?.filter(
          (machine) => machine.locationId === selectedLoc.id
        ) || []
      );
    }
    return this.machines() || [];
  });

  machines = this.storeServiceFacade.machines;
  locations = this.storeServiceFacade.locations;
  selectedLocation: WritableSignal<Location | undefined> = signal(undefined);

  totalMachines = this.storeServiceFacade.totalMachines;
  onlineMachines = this.storeServiceFacade.onlineMachines;
  offlineMachines = this.storeServiceFacade.offlineMachines;
  maintenanceMachines = this.storeServiceFacade.maintenanceMachines;

  constructor() {
    effect(() => {
      if (this.selectedMachines().length && this.currentClientWidth() > 480) {
        setTimeout(() => {
          this.onScroll();
        }, 300);
      }
    });
  }
  ngAfterViewInit(): void {
    this.renderer.listen('window', 'resize', (event) => {
      this.currentClientWidth.set(+event?.currentTarget?.innerWidth || 0);

      if (this.washingMachineCards && this.currentClientWidth() <= 480) {
        this.washingMachineCards.forEach((e) => {
          const nativeElementChild = e.elementRef.nativeElement;
          this.renderer.removeClass(nativeElementChild, 'faded');
        });
      }
    });
  }

  ngOnInit(): void {
    this.appService.getMachines().subscribe((machines) => {
      this.storeServiceFacade.dispatchWashingMachines(machines);
    });

    this.appService.getLocations().subscribe((machines) => {
      this.storeServiceFacade.dispatchLocations(machines);
    });

    this.currentClientWidth.set(+window.innerWidth);
  }

  onLocationChange(event: MatChipListboxChange) {
    this.selectedLocation.set(
      this.locations()?.find((item) => item.name === event.value)
    );
  }

  selectLocationByMachine(locationId: number): Location | undefined {
    return this.locations().find((e) => e.id === locationId);
  }

  scroll(direction: 'left' | 'right') {
    const scrollAmount = 150;

    if (direction === 'left') {
      this.cardListWrapper.nativeElement.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    } else if (direction === 'right') {
      this.cardListWrapper.nativeElement.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }

    setTimeout(() => this.onScroll(), 300);
  }

  onScroll(): void {
    const scrollLeft = this.cardListWrapper.nativeElement.scrollLeft;
    const clientWidth = this.cardListWrapper.nativeElement.clientWidth;
    const cardWidth = 200;

    const firstVisibleIndex = Math.floor(scrollLeft / cardWidth) + 1;
    const lastVisibleIndex =
      Math.ceil((scrollLeft + clientWidth) / cardWidth) - 1;

    if (this.washingMachineCards) {
      this.washingMachineCards.forEach((child, index) => {
        const currentNativeElement = child.elementRef.nativeElement;
        if (
          (index < firstVisibleIndex && firstVisibleIndex !== 1) ||
          index >= lastVisibleIndex
        ) {
          this.renderer.addClass(currentNativeElement, 'faded');
        } else {
          this.renderer.removeClass(currentNativeElement, 'faded');
        }
      });
    }
  }

  openHelpModal() {}
}
