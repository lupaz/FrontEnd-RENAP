import { TestBed } from '@angular/core/testing';

import { MatrimonioService } from './matrimonio.service';

describe('MatrimonioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatrimonioService = TestBed.get(MatrimonioService);
    expect(service).toBeTruthy();
  });
});
