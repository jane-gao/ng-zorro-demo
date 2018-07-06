import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindRolesComponent } from './bind-roles.component';

describe('BindRolesComponent', () => {
  let component: BindRolesComponent;
  let fixture: ComponentFixture<BindRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
