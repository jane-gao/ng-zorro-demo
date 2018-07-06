import { TestBed, inject } from '@angular/core/testing';

import { BasicSettingService } from './basic-setting.service';

describe('BasicSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicSettingService]
    });
  });

  it('should be created', inject([BasicSettingService], (service: BasicSettingService) => {
    expect(service).toBeTruthy();
  }));
});
