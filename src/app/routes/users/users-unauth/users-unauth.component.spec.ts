import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUnauthComponent } from './users-unauth.component';

describe('UsersUnauthComponent', () => {
  let component: UsersUnauthComponent;
  let fixture: ComponentFixture<UsersUnauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersUnauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUnauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
