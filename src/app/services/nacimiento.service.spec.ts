import { TestBed } from '@angular/core/testing';

import { NacimientoService } from './nacimiento.service';

describe('NacimientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NacimientoService = TestBed.get(NacimientoService);
    expect(service).toBeTruthy();
  });
});
