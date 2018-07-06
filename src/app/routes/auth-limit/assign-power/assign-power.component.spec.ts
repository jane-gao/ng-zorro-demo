import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPowerComponent } from './assign-power.component';

describe('AssignPowerComponent', () => {
  let component: AssignPowerComponent;
  let fixture: ComponentFixture<AssignPowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
