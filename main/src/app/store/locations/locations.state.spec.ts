import { NgxsModule, Store } from '@ngxs/store';
import { Location } from '../../app.model';
import { TestBed } from '@angular/core/testing';
import { LocationState } from './location.state';
import * as Actions from './location.actions';

describe('LocationState', () => {
  let store: Store;

  const initialLocations: Location[] = [
    {
      id: 1,
      name: 'Location 1',
    },
    {
      id: 2,
      name: 'Location 2',
    },
    {
      id: 3,
      name: 'Location 3',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([LocationState])],
    });

    store = TestBed.inject(Store);
  });

  it('should set locations correctly with LocationAction action', () => {
    store.dispatch(new Actions.LocationAction(initialLocations));
    const machines = store.selectSnapshot(LocationState.getLocations);
    expect(machines).toEqual(initialLocations);
  });
});
