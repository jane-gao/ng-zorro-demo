import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCandyComponent } from './user-candy.component';

describe('UserCandyComponent', () => {
  let component: UserCandyComponent;
  let fixture: ComponentFixture<UserCandyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCandyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCandyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
