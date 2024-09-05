import { Location } from '../../app.model';
export class LocationAction {
  static readonly type = '[Location] Add item';
  constructor(readonly locations: Location[]) {}
}

export * from './location.actions';
