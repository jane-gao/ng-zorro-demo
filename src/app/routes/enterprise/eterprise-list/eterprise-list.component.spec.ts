import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EterpriseListComponent } from './eterprise-list.component';

describe('EterpriseListComponent', () => {
  let component: EterpriseListComponent;
  let fixture: ComponentFixture<EterpriseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EterpriseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EterpriseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
