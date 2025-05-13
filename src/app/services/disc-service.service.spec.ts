import { TestBed } from '@angular/core/testing';

import { DiscServiceService } from './disc-service.service';

describe('DiscServiceService', () => {
  let service: DiscServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
