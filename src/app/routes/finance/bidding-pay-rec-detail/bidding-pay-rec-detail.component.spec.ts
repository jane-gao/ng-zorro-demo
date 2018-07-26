import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingPayRecDetailComponent } from './bidding-pay-rec-detail.component';

describe('BiddingPayRecDetailComponent', () => {
  let component: BiddingPayRecDetailComponent;
  let fixture: ComponentFixture<BiddingPayRecDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingPayRecDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingPayRecDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
