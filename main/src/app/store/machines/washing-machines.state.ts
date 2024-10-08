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
  static getMachines(state: WashingMachinesStateModel) {
    return state.machines;
  }

  @Selector([WashingMachinesState.getMachines])
  static getTotalMachines(state: Machine[]) {
    return state?.length || 0;
  }

  @Selector([WashingMachinesState.getMachines])
  static getTotalOnlineMachines(state: Machine[]) {
    return state.filter((e) => e.status === 'online').length;
  }

  @Selector([WashingMachinesState.getMachines])
  static getTotalOfflineMachines(state: Machine[]) {
    return state.filter((e) => e.status === 'offline').length;
  }

  @Selector([WashingMachinesState.getMachines])
  static getTotalUnderMaintenanceMachines(state: Machine[]) {
    return state.filter((e) => e.status === 'maintenance').length;
  }

  @Action(Actions.SetWashingMachines)
  add(
    ctx: StateContext<WashingMachinesStateModel>,
    { machineArray }: Actions.SetWashingMachines
  ) {
    ctx.setState({
      machines: machineArray,
    });
  }

  @Action(Actions.EditWashingMachine)
  edit(
    ctx: StateContext<WashingMachinesStateModel>,
    { machineToEditPayload: { id, newMachine } }: Actions.EditWashingMachine
  ) {
    const stateModel = ctx.getState();

    ctx.setState({
      machines: stateModel.machines.map((machine) => {
        if (machine.id === id) {
          return {
            ...machine,
            ...newMachine,
          };
        }
        return machine;
      }),
    });
  }

  @Action(Actions.DeleteWashingMachine)
  delete(
    ctx: StateContext<WashingMachinesStateModel>,
    { id }: Actions.DeleteWashingMachine
  ) {
    const stateModel = ctx.getState();
    ctx.setState({
      machines: stateModel.machines.filter((machine) => machine.id !== id),
    });
  }
}
