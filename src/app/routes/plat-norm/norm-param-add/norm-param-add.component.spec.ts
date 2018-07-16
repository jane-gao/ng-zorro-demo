import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormParamAddComponent } from './norm-param-add.component';

describe('NormParamAddComponent', () => {
  let component: NormParamAddComponent;
  let fixture: ComponentFixture<NormParamAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormParamAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormParamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
