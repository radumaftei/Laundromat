import { Machine } from '../../app.model';

export interface EditMachineModel {
  result: 'close' | 'save';
  id?: number;
  newMachine?: Omit<Machine, 'id'>;
}
