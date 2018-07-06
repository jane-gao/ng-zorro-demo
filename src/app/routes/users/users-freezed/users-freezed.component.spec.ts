import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFreezedComponent } from './users-freezed.component';

describe('UsersFreezedComponent', () => {
  let component: UsersFreezedComponent;
  let fixture: ComponentFixture<UsersFreezedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersFreezedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFreezedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
