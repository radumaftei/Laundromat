import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { WashingMachinesState, WashingMachinesStateModel } from './washing-machines.state';
import { WashingMachinesAction } from './washing-machines.actions';

describe('WashingMachines store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([WashingMachinesState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: WashingMachinesStateModel = {
      items: ['item-1']
    };
    store.dispatch(new WashingMachinesAction('item-1'));
    const actual = store.selectSnapshot(WashingMachinesState.getState);
    expect(actual).toEqual(expected);
  });

});
