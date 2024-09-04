import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import * as Actions from './washing-machines.actions';
import { Machine } from '../../app.model';

export interface WashingMachinesStateModel {
  machines: Machine[];
}

@State<WashingMachinesStateModel>({
  name: 'washingMachines',
  defaults: {
    machines: [],
  },
})
@Injectable()
export class WashingMachinesState {
  @Selector()
  static getState(state: WashingMachinesStateModel) {
    return state;
  }

  @Action(Actions.WashingMachinesAction)
  add(
    ctx: StateContext<WashingMachinesStateModel>,
    { machineArray }: Actions.WashingMachinesAction
  ) {
    ctx.setState({
      machines: machineArray,
    });
  }

  @Action(Actions.WashingMachinesEditAction)
  edit(
    ctx: StateContext<WashingMachinesStateModel>,
    { machineToEdit }: Actions.WashingMachinesEditAction
  ) {
    const stateModel = ctx.getState();

    ctx.setState({
      machines: stateModel.machines.map((machine) => {
        if (machine.id === machineToEdit.id) {
          return machineToEdit;
        }
        return machine;
      }),
    });
  }

  @Action(Actions.WashingMachinesDeleteAction)
  delete(
    ctx: StateContext<WashingMachinesStateModel>,
    { id }: Actions.WashingMachinesDeleteAction
  ) {
    const stateModel = ctx.getState();
    ctx.setState({
      machines: stateModel.machines.filter((machine) => machine.id !== id),
    });
  }
}
