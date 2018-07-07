import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandUpComponent } from './brand-up.component';

describe('BrandUpComponent', () => {
  let component: BrandUpComponent;
  let fixture: ComponentFixture<BrandUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
