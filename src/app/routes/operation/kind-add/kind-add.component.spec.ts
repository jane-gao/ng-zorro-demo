import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KindAddComponent } from './kind-add.component';

describe('KindAddComponent', () => {
  let component: KindAddComponent;
  let fixture: ComponentFixture<KindAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KindAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KindAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
