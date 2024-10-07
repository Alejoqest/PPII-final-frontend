import { TestBed } from '@angular/core/testing';

import { CarroF
  acturaService } from './carrofactura.service';

describe('CarroF
  acturaService', () => {
  let service: CarroF
  acturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarroF
      acturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
