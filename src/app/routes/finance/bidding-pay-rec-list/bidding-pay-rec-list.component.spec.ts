import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingPayRecListComponent } from './bidding-pay-rec-list.component';

describe('BiddingPayRecListComponent', () => {
  let component: BiddingPayRecListComponent;
  let fixture: ComponentFixture<BiddingPayRecListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingPayRecListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingPayRecListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
