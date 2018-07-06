import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpPwdComponent } from './up-pwd.component';

describe('UpPwdComponent', () => {
  let component: UpPwdComponent;
  let fixture: ComponentFixture<UpPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
