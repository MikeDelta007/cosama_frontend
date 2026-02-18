import { TestBed } from '@angular/core/testing';

import { StatsAdminService } from './stats-admin.service';

describe('StatsAdminService', () => {
  let service: StatsAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
