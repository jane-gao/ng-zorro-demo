import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingDetailComponent } from './bidding-detail.component';

describe('BiddingDetailComponent', () => {
  let component: BiddingDetailComponent;
  let fixture: ComponentFixture<BiddingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
