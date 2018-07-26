import { TestBed, inject } from '@angular/core/testing';

import { BiddingService } from './bidding.service';

describe('BiddingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiddingService]
    });
  });

  it('should be created', inject([BiddingService], (service: BiddingService) => {
    expect(service).toBeTruthy();
  }));
});
