import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SAMPLE_CONTENT, Grade } from './data';

@Component({
  selector: 'chapter-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="chapter-page" *ngIf="grade() as g">
      <div class="page-header">
        <p class="eyebrow">Chapter overview</p>
        <h2>{{ g.title }}</h2>
        <p class="subtitle">Pick a lesson to open the study dashboard.</p>
      </div>

      <div class="chapter-layout">
        <aside class="chapter-sidebar">
          <div class="sidebar-title">Chapters</div>
          <ul class="chapter-list">
            <li *ngFor="let c of g.chapters" class="chapter-card">
              <div class="chapter-card-header">
                <span>{{ c.title }}</span>
                <span class="chapter-count">{{ c.lessons.length }} lessons</span>
              </div>
              <ol class="lesson-items">
                <li *ngFor="let l of c.lessons">
                  <a class="lesson-link" [routerLink]="['/grade', g.id, 'chapter', c.id, 'lesson', l.id]">
                    {{ l.title }}
                  </a>
                </li>
              </ol>
            </li>
          </ul>
        </aside>

        <div class="chapter-preview">
          <div class="empty-state">
            <p>Select a lesson to review notes, play the video, read the summary, or complete the quiz.</p>
          </div>
        </div>
      </div>
    </section>
    <p *ngIf="!grade()">Grade not found.</p>
  `,
})
export class ChapterListComponent {
  private route = inject(ActivatedRoute);
  gradeId = signal<string | null>(null);
  grade = computed<Grade | undefined>(() => {
    const id = this.gradeId();
    return SAMPLE_CONTENT.find((g) => g.id === id);
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('gradeId');
    this.gradeId.set(id);
  }
}
