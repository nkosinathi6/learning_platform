import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from './data';

@Component({
  selector: 'assessment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section *ngIf="questions?.length">
      <h3>Assessment</h3>
      <form (submit)="onSubmit($event)">
        <div *ngFor="let q of questions; let i = index">
          <fieldset>
            <legend>{{ i + 1 }}. {{ q.text }}</legend>
            <div *ngFor="let choice of q.choices; let ci = index">
              <label>
                <input type="radio" name="{{ q.id }}" (change)="select(q.id, ci)" [checked]="answers()[q.id] === ci" />
                {{ choice }}
              </label>
            </div>
          </fieldset>
        </div>
        <button type="submit">Submit</button>
      </form>

      <div *ngIf="submitted()">
        <p>Score: {{ score() }} / {{ questions?.length }}</p>
        <button (click)="reset()">Retake</button>
      </div>
    </section>
    <p *ngIf="!questions || !questions.length">No assessment for this lesson.</p>
  `,
})
export class AssessmentComponent {
  @Input() questions: Question[] | undefined;

  answers = signal<Record<string, number>>({});
  submitted = signal(false);
  score = signal(0);

  select(qid: string, choiceIndex: number) {
    const copy = { ...this.answers() };
    copy[qid] = choiceIndex;
    this.answers.set(copy);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const qs = this.questions ?? [];
    let s = 0;
    for (const q of qs) {
      if (this.answers()[q.id] === q.answer) s++;
    }
    this.score.set(s);
    this.submitted.set(true);
  }

  reset() {
    this.answers.set({});
    this.submitted.set(false);
    this.score.set(0);
  }
}
