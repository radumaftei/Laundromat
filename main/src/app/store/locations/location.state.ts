import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { LocationAction } from './location.actions';
import { Location } from '../../app.model';

export interface LocationStateModel {
  locations: Location[];
}

@State<LocationStateModel>({
  name: 'location',
  defaults: {
    locations: [],
  },
})
@Injectable()
export class LocationState {
  @Selector()
  static getLocations(state: LocationStateModel) {
    return state.locations;
  }

  @Action(LocationAction)
  add(ctx: StateContext<LocationStateModel>, { locations }: LocationAction) {
    ctx.setState({
      locations,
    });
  }
}
