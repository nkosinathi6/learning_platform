import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SAMPLE_CONTENT } from './data';
import { AssessmentComponent } from './assessment.component';

@Component({
  selector: 'lesson-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, AssessmentComponent],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.css',
})
export class LessonDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  readonly tab = signal<'video' | 'tutorial' | 'summary' | 'assessment'>('video');

  readonly lessonContext = computed(() => {
    const gradeId = this.route.snapshot.paramMap.get('gradeId');
    const chapterId = this.route.snapshot.paramMap.get('chapterId');
    const lessonId = this.route.snapshot.paramMap.get('lessonId');
    const grade = SAMPLE_CONTENT.find((item) => item.id === gradeId);
    const chapter = grade?.chapters.find((entry) => entry.id === chapterId);
    const lesson = chapter?.lessons.find((entry) => entry.id === lessonId);

    if (!grade || !chapter || !lesson) {
      return undefined;
    }

    const position = chapter.lessons.findIndex((entry) => entry.id === lesson.id) + 1;
    const total = chapter.lessons.length;

    return { grade, chapter, lesson, position, total };
  });

  get videoUrl(): SafeResourceUrl | null {
    const lesson = this.lessonContext()?.lesson;
    if (!lesson?.videoUrl) {
      return null;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(lesson.videoUrl);
  }

  goBack() {
    const context = this.lessonContext();
    if (context?.grade) {
      this.router.navigate(['/grade', context.grade.id]);
    }
  }
}
