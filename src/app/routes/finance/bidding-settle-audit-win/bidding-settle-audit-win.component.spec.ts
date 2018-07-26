import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingSettleAuditWinComponent } from './bidding-settle-audit-win.component';

describe('BiddingSettleAuditWinComponent', () => {
  let component: BiddingSettleAuditWinComponent;
  let fixture: ComponentFixture<BiddingSettleAuditWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingSettleAuditWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingSettleAuditWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
