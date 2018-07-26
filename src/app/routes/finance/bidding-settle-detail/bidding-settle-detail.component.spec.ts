import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingSettleDetailComponent } from './bidding-settle-detail.component';

describe('BiddingSettleDetailComponent', () => {
  let component: BiddingSettleDetailComponent;
  let fixture: ComponentFixture<BiddingSettleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingSettleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingSettleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
