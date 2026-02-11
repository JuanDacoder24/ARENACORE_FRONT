import { TestBed } from '@angular/core/testing';

import { UserSerevice } from './user-service';

describe('UserSerevice', () => {
  let service: UserSerevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSerevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
