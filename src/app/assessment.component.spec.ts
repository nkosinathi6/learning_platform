import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentComponent } from './assessment.component';
import { SAMPLE_CONTENT } from './data';

describe('AssessmentComponent', () => {
  let fixture: ComponentFixture<AssessmentComponent>;
  let component: AssessmentComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the score after submission', () => {
    component.questions = SAMPLE_CONTENT[0].chapters[0].lessons[0].assessment;
    fixture.detectChanges();

    component.select('q1', 0);
    component.onSubmit(new Event('submit'));

    expect(component.score()).toBe(1);
    expect(component.submitted()).toBe(true);
  });

  it('should reset the assessment state', () => {
    component.questions = SAMPLE_CONTENT[0].chapters[0].lessons[0].assessment;
    fixture.detectChanges();

    component.select('q1', 0);
    component.onSubmit(new Event('submit'));
    component.reset();

    expect(component.answers()).toEqual({});
    expect(component.score()).toBe(0);
    expect(component.submitted()).toBe(false);
  });
});
