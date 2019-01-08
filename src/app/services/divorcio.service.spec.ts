import { TestBed } from '@angular/core/testing';

import { DivorcioService } from './divorcio.service';

describe('DivorcioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DivorcioService = TestBed.get(DivorcioService);
    expect(service).toBeTruthy();
  });
});
