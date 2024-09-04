export class LocationAction {
  static readonly type = '[Location] Add item';
  constructor(readonly payload: string) {}
}

export * from './location.actions';
