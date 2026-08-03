import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from './data';

@Component({
  selector: 'assessment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css',
})
export class AssessmentComponent {
  @Input() questions: Question[] | undefined;

  readonly answers = signal<Record<string, number>>({});
  readonly submitted = signal(false);
  readonly score = signal(0);

  readonly questionList = computed<Question[]>(() => this.questions ?? []);

  select(qid: string, choiceIndex: number) {
    const copy = { ...this.answers() };
    copy[qid] = choiceIndex;
    this.answers.set(copy);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const qs = this.questionList();
    let s = 0;
    for (const q of qs) {
      if (this.answers()[q.id] === q.answer) {
        s++;
      }
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
