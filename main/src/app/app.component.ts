import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
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
export class AppComponent implements OnInit {
  private readonly appService = inject(AppService);
  private readonly storeServiceFacade = inject(StoreServiceFacade);

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

  onLocationChange(event: MatChipListboxChange) {
    this.selectedLocation.set(
      this.locations()?.find((item) => item.name === event.value)
    );
  }

  selectLocationByMachine(locationId: number): Location | undefined {
    return this.locations().find((e) => e.id === locationId);
  }
}
