import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpKindComponent } from './help-kind.component';

describe('HelpKindComponent', () => {
  let component: HelpKindComponent;
  let fixture: ComponentFixture<HelpKindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpKindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
