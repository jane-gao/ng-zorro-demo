import { TestBed, inject } from '@angular/core/testing';

import { PlatNormService } from './plat-norm.service';

describe('PlatNormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlatNormService]
    });
  });

  it('should be created', inject([PlatNormService], (service: PlatNormService) => {
    expect(service).toBeTruthy();
  }));
});
