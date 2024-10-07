import { TestBed } from '@angular/core/testing';

import { BusEventoService } from './bus-evento.service';

describe('BusEventoService', () => {
  let service: BusEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
