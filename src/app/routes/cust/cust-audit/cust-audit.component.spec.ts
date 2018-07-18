import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustAuditComponent } from './cust-audit.component';

describe('CustAuditComponent', () => {
  let component: CustAuditComponent;
  let fixture: ComponentFixture<CustAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
