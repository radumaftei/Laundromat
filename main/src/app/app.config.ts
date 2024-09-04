import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngxs/store';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { WashingMachinesState } from './store/machines/washing-machines.state';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { LocationState } from './store/locations/location.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(
      [WashingMachinesState, LocationState],
      withNgxsLoggerPlugin(),
      withNgxsReduxDevtoolsPlugin()
    ),
  ],
};
