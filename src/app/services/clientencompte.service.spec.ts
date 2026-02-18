import { TestBed } from '@angular/core/testing';

import { ClientencompteService } from './clientencompte.service';

describe('ClientencompteService', () => {
  let service: ClientencompteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientencompteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
