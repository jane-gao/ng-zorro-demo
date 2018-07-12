import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAnswerAddComponent } from './help-answer-add.component';

describe('HelpAnswerAddComponent', () => {
  let component: HelpAnswerAddComponent;
  let fixture: ComponentFixture<HelpAnswerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpAnswerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpAnswerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
