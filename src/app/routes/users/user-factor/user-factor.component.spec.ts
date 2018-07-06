import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFactorComponent } from './user-factor.component';

describe('UserFactorComponent', () => {
  let component: UserFactorComponent;
  let fixture: ComponentFixture<UserFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
