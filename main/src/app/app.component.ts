import {
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { Location } from './app.model';
import { AppService } from './app.service';
import { WashingMachineCardComponent } from './components/washing-machine-card/washing-machine-card.component';
import { tap } from 'rxjs';
import { Store } from '@ngxs/store';
import * as WashingMachinesActions from './store/machines/washing-machines.actions';
import { StoreServiceFacade } from './store/store.service';
import { WashingMachinesState } from './store/machines/washing-machines.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WashingMachineCardComponent, MatChipsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Laundromat';
  private readonly appService = inject(AppService);
  private readonly storeServiceFacade = inject(StoreServiceFacade);

  machines = toSignal(
    this.appService.getMachines().pipe(
      tap((machines) => {
        this.storeServiceFacade.dispatchWashingMachines(machines);
      })
    )
  );

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

  locations = toSignal(this.appService.getLocations());
  selectedLocation: WritableSignal<Location | undefined> = signal(undefined);

  onLocationChange(event: MatChipListboxChange) {
    this.selectedLocation.set(
      this.locations()?.find((item) => item.name === event.value)
    );
  }

  // temporary
  private store = inject(Store);
  constructor() {
    this.store.select(WashingMachinesState.getState).subscribe((storeData) => {
      console.log('storeData', storeData);
    });
  }
}
