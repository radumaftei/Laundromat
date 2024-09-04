import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { LocationAction } from './location.actions';

export interface LocationStateModel {
  items: string[];
}

@State<LocationStateModel>({
  name: 'location',
  defaults: {
    items: []
  }
})
@Injectable()
export class LocationState {

  @Selector()
  static getState(state: LocationStateModel) {
    return state;
  }

  @Action(LocationAction)
  add(ctx: StateContext<LocationStateModel>, { payload }: LocationAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
