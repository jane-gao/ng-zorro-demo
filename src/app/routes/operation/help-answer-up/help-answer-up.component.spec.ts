import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAnswerUpComponent } from './help-answer-up.component';

describe('HelpAnswerUpComponent', () => {
  let component: HelpAnswerUpComponent;
  let fixture: ComponentFixture<HelpAnswerUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpAnswerUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpAnswerUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
