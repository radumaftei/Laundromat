import { Machine } from '../../app.model';

export class SetWashingMachines {
  static readonly type = '[WashingMachines] Add machines';
  constructor(readonly machineArray: Machine[]) {}
}

export class EditWashingMachine {
  static readonly type = '[WashingMachines] Edit machine';
  constructor(
    readonly machineToEditPayload: {
      newMachine: Omit<Machine, 'id'>;
      id: number;
    }
  ) {}
}

export class DeleteWashingMachine {
  static readonly type = '[WashingMachines] Delete machine';
  constructor(readonly id: number) {}
}

export * from './washing-machines.actions';
