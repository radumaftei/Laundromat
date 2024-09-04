import { Machine } from '../../app.model';

export class WashingMachinesAction {
  static readonly type = '[WashingMachines] Add machines';
  constructor(readonly machineArray: Machine[]) {}
}

export class WashingMachinesEditAction {
  static readonly type = '[WashingMachines] Edit machine';
  constructor(readonly machineToEdit: Machine) {}
}

export class WashingMachinesDeleteAction {
  static readonly type = '[WashingMachines] Delete machine';
  constructor(readonly id: number) {}
}

export * from './washing-machines.actions';
