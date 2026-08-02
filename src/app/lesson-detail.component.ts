import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SAMPLE_CONTENT, Chapter, Grade, Lesson } from './data';
import { AssessmentComponent } from './assessment.component';

@Component({
  selector: 'lesson-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, AssessmentComponent],
  template: `
    <section class="lesson-detail-page" *ngIf="lessonContext() as ctx">
      <div class="page-header">
        <p class="eyebrow">{{ ctx.chapter?.title || 'Chapter' }}</p>
        <h2>{{ ctx.lesson.title }}</h2>
        <div class="step-indicator">
          <span>Step {{ ctx.position }} of {{ ctx.total }}</span>
          <div class="progress-track">
            <span class="progress-fill" [style.width.%]="(ctx.position / ctx.total) * 100"></span>
          </div>
        </div>
      </div>

      <div class="lesson-detail-layout">
        <aside class="lesson-sidebar">
          <div class="sidebar-heading">Lessons</div>
          <ol class="lesson-nav">
            <li *ngFor="let item of ctx.chapter?.lessons">
              <a
                [routerLink]="['/grade', ctx.grade?.id, 'chapter', ctx.chapter?.id, 'lesson', item.id]"
                [class.active]="item.id === ctx.lesson.id"
              >
                <span class="lesson-dot"></span>
                {{ item.title }}
              </a>
            </li>
          </ol>
        </aside>

        <div class="lesson-content">
          <nav class="tab-nav">
            <button type="button" class="tab-button" [class.active]="tab() === 'notes'" (click)="tab.set('notes')">Notes</button>
            <button type="button" class="tab-button" [class.active]="tab() === 'video'" (click)="tab.set('video')">Video</button>
            <button type="button" class="tab-button" [class.active]="tab() === 'summary'" (click)="tab.set('summary')">Summary</button>
            <button type="button" class="tab-button" [class.active]="tab() === 'assessment'" (click)="tab.set('assessment')">Assessment</button>
          </nav>

          <article class="tab-panel" *ngIf="tab() === 'notes'">
            <div class="panel-card" [innerHTML]="ctx.lesson.notes"></div>
          </article>

          <article class="tab-panel" *ngIf="tab() === 'video'">
            <div class="video-card">
              <div *ngIf="videoUrl; else noVideo" class="video-frame">
                <iframe [src]="videoUrl" title="Lesson video" frameborder="0" allowfullscreen></iframe>
              </div>
              <ng-template #noVideo>
                <div class="video-empty">No video available.</div>
              </ng-template>
            </div>
          </article>

          <article class="tab-panel" *ngIf="tab() === 'summary'">
            <div class="panel-card">
              <p>{{ ctx.lesson.summary }}</p>
            </div>
          </article>

          <article class="tab-panel" *ngIf="tab() === 'assessment'">
            <assessment [questions]="ctx.lesson.assessment"></assessment>
          </article>

          <div class="lesson-actions">
            <button type="button" class="btn-secondary" (click)="goBack()">Back</button>
            <button type="button" class="btn-primary" (click)="tab.set('summary')">Continue to summary</button>
          </div>
        </div>
      </div>
    </section>

    <p *ngIf="!lessonContext()">Lesson not found.</p>
  `,
})
export class LessonDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  tab = signal<'notes' | 'video' | 'summary' | 'assessment'>('notes');

  lessonContext = computed(() => {
    const gradeId = this.route.snapshot.paramMap.get('gradeId');
    const chapterId = this.route.snapshot.paramMap.get('chapterId');
    const lessonId = this.route.snapshot.paramMap.get('lessonId');
    const grade = SAMPLE_CONTENT.find((x) => x.id === gradeId);
    const chapter = grade?.chapters.find((ch) => ch.id === chapterId);
    const lesson = chapter?.lessons.find((l) => l.id === lessonId);

    if (!grade || !chapter || !lesson) {
      return undefined;
    }

    const position = chapter.lessons.findIndex((l) => l.id === lesson.id) + 1;
    const total = chapter.lessons.length;

    return { grade, chapter, lesson, position, total };
  });

  get videoUrl(): SafeResourceUrl | null {
    const lesson = this.lessonContext()?.lesson;
    if (!lesson?.videoUrl) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(lesson.videoUrl);
  }

  goBack() {
    const ctx = this.lessonContext();
    if (ctx?.grade) {
      this.router.navigate(['/grade', ctx.grade.id]);
    }
  }
}
