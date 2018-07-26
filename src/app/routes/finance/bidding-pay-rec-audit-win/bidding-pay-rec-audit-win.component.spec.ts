import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingPayRecAuditWinComponent } from './bidding-pay-rec-audit-win.component';

describe('BiddingPayRecAuditWinComponent', () => {
  let component: BiddingPayRecAuditWinComponent;
  let fixture: ComponentFixture<BiddingPayRecAuditWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingPayRecAuditWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingPayRecAuditWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
