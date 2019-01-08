import { TestBed } from '@angular/core/testing';

import { DefuncionService } from './defuncion.service';

describe('DefuncionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefuncionService = TestBed.get(DefuncionService);
    expect(service).toBeTruthy();
  });
});
