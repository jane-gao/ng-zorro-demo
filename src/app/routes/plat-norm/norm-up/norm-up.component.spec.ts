import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormUpComponent } from './norm-up.component';

describe('NormUpComponent', () => {
  let component: NormUpComponent;
  let fixture: ComponentFixture<NormUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
