import { TestBed, inject } from '@angular/core/testing';

import { AuthLimitService } from './auth-limit.service';

describe('AuthLimitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLimitService]
    });
  });

  it('should be created', inject([AuthLimitService], (service: AuthLimitService) => {
    expect(service).toBeTruthy();
  }));
});
