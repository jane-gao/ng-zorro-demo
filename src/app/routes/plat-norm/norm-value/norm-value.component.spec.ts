import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormValueComponent } from './norm-value.component';

describe('NormValueComponent', () => {
  let component: NormValueComponent;
  let fixture: ComponentFixture<NormValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
