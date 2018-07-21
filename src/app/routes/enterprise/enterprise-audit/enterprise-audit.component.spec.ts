import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseAuditComponent } from './enterprise-audit.component';

describe('EnterpriseAuditComponent', () => {
  let component: EnterpriseAuditComponent;
  let fixture: ComponentFixture<EnterpriseAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
