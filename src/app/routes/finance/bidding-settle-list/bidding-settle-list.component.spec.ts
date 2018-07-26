import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingSettleListComponent } from './bidding-settle-list.component';

describe('BiddingSettleListComponent', () => {
  let component: BiddingSettleListComponent;
  let fixture: ComponentFixture<BiddingSettleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingSettleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingSettleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
