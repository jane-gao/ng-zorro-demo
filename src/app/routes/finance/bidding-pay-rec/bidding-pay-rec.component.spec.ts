import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingPayRecComponent } from './bidding-pay-rec.component';

describe('BiddingPayRecComponent', () => {
  let component: BiddingPayRecComponent;
  let fixture: ComponentFixture<BiddingPayRecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingPayRecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingPayRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
