import { TestBed } from '@angular/core/testing';

import { DeblocageplaceService } from './deblocageplace.service';

describe('DeblocageplaceService', () => {
  let service: DeblocageplaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeblocageplaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
