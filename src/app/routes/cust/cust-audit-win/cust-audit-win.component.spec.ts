import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustAuditWinComponent } from './cust-audit-win.component';

describe('CustAuditWinComponent', () => {
  let component: CustAuditWinComponent;
  let fixture: ComponentFixture<CustAuditWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustAuditWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustAuditWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
