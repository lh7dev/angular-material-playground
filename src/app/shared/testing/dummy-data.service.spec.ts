import { TestBed } from '@angular/core/testing';

import { DummyDataService } from './dummy-data.service';

describe('DummyDataService', () => {
  let service: DummyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
