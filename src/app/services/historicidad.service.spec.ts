import { TestBed } from '@angular/core/testing';

import { HistoricidadService } from './historicidad.service';

describe('HistoricidadService', () => {
  let service: HistoricidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
