import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { Location } from './app.model';
import { AppService } from './app.service';
import { WashingMachineCardComponent } from './components/washing-machine-card/washing-machine-card.component';
import { StoreServiceFacade } from './store/store-facade.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WashingMachineCardComponent, MatChipsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  private readonly appService = inject(AppService);
  private readonly storeServiceFacade = inject(StoreServiceFacade);
  private readonly renderer = inject(Renderer2);

  @ViewChild('cardListWrapper', { static: true })
  cardListWrapper!: ElementRef<HTMLDivElement>;

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

  ngOnInit(): void {
    this.appService.getMachines().subscribe((machines) => {
      this.storeServiceFacade.dispatchWashingMachines(machines);
    });

    this.appService.getLocations().subscribe((machines) => {
      this.storeServiceFacade.dispatchLocations(machines);
    });
  }

  ngAfterViewInit(): void {
    this.preventScrolling();
    setTimeout(() => {
      this.onScroll();
    }, 200);
  }

  preventScrolling() {
    const element = this.cardListWrapper.nativeElement;
    this.renderer.listen(element, 'wheel', (event) => event.preventDefault());
    this.renderer.listen(element, 'mousedown', (event) =>
      event.preventDefault()
    );
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
    const children = this.cardListWrapper.nativeElement.querySelectorAll(
      '.card-list > app-washing-machine-card'
    );

    const firstVisibleIndex = Math.floor(scrollLeft / cardWidth) + 1;
    const lastVisibleIndex =
      Math.ceil((scrollLeft + clientWidth) / cardWidth) - 1;

    children.forEach((child, index) => {
      if (
        (index < firstVisibleIndex && firstVisibleIndex !== 1) ||
        index >= lastVisibleIndex
      ) {
        child.classList.add('faded');
      } else {
        child.classList.remove('faded');
      }
    });
  }
}
