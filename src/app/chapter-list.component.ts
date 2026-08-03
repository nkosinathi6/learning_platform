import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SAMPLE_CONTENT, Grade } from './data';

@Component({
  selector: 'chapter-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chapter-list.component.html',
  styleUrl: './chapter-list.component.css',
})
export class ChapterListComponent {
  private route = inject(ActivatedRoute);
  readonly gradeId = signal<string | null>(null);
  readonly grade = computed<Grade | undefined>(() => {
    const id = this.gradeId();
    return SAMPLE_CONTENT.find((grade) => grade.id === id);
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('gradeId');
    this.gradeId.set(id);
  }
}
