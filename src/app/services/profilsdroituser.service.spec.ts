import { TestBed } from '@angular/core/testing';

import { ProfilsdroituserService } from './profilsdroituser.service';

describe('ProfilsdroituserService', () => {
  let service: ProfilsdroituserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilsdroituserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
