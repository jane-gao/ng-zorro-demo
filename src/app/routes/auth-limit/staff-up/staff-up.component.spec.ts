import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffUpComponent } from './staff-up.component';

describe('StaffUpComponent', () => {
  let component: StaffUpComponent;
  let fixture: ComponentFixture<StaffUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
