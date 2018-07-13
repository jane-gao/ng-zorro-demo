import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KindBrandBindComponent } from './kind-brand-bind.component';

describe('KindBrandBindComponent', () => {
  let component: KindBrandBindComponent;
  let fixture: ComponentFixture<KindBrandBindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KindBrandBindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KindBrandBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
