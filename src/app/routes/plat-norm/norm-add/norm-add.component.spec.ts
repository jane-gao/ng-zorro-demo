import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormAddComponent } from './norm-add.component';

describe('NormAddComponent', () => {
  let component: NormAddComponent;
  let fixture: ComponentFixture<NormAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
