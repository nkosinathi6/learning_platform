import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SAMPLE_CONTENT } from './data';

@Component({
  selector: 'grade-selector',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="grade-selector">
      <div class="page-header">
        <p class="eyebrow">Start here</p>
        <h2>Select grade level</h2>
        <p class="subtitle">Choose the right curriculum for year 10–12.</p>
      </div>

      <div class="grade-grid">
        <a class="grade-card" *ngFor="let g of grades" [routerLink]="['/grade', g.id]">
          <div class="grade-card-top">
            <span class="grade-tag">Grade</span>
            <span class="grade-count">{{ g.chapters.length }} chapters</span>
          </div>
          <h3>{{ g.title }}</h3>
          <p class="grade-note">Lessons, summaries, videos, and quizzes for each chapter.</p>
        </a>
      </div>
    </section>
  `,
})
export class GradeSelectorComponent {
  grades = SAMPLE_CONTENT;
}
