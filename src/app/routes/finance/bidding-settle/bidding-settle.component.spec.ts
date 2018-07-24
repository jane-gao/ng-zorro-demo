import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingSettleComponent } from './bidding-settle.component';

describe('BiddingSettleComponent', () => {
  let component: BiddingSettleComponent;
  let fixture: ComponentFixture<BiddingSettleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingSettleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingSettleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
