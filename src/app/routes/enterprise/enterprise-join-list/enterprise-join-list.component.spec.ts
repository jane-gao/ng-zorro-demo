import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseJoinListComponent } from './enterprise-join-list.component';

describe('EnterpriseJoinListComponent', () => {
  let component: EnterpriseJoinListComponent;
  let fixture: ComponentFixture<EnterpriseJoinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseJoinListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseJoinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
