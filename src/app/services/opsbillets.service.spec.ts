import { TestBed } from '@angular/core/testing';

import { OpsbilletsService } from './opsbillets.service';

describe('OpsbilletsService', () => {
  let service: OpsbilletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpsbilletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
