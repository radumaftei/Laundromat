import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { LocationState, LocationStateModel } from './location.state';
import { LocationAction } from './location.actions';

describe('Location store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([LocationState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: LocationStateModel = {
      items: ['item-1']
    };
    store.dispatch(new LocationAction('item-1'));
    const actual = store.selectSnapshot(LocationState.getState);
    expect(actual).toEqual(expected);
  });

});
