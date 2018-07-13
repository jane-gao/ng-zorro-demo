import { TestBed, inject } from '@angular/core/testing';

import { AnnounceService } from './announce.service';

describe('AnnounceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnounceService]
    });
  });

  it('should be created', inject([AnnounceService], (service: AnnounceService) => {
    expect(service).toBeTruthy();
  }));
});
