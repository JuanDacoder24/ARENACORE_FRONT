import { TestBed } from '@angular/core/testing';

import { ArenacoreService } from './arenacore-service';

describe('ArenacoreService', () => {
  let service: ArenacoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArenacoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
