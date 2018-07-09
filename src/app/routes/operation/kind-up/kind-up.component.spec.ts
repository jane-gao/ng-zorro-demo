import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KindUpComponent } from './kind-up.component';

describe('KindUpComponent', () => {
  let component: KindUpComponent;
  let fixture: ComponentFixture<KindUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KindUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KindUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
