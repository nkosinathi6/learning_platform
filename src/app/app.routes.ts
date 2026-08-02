import { Routes } from '@angular/router';
import { GradeSelectorComponent } from './grade-selector.component';
import { ChapterListComponent } from './chapter-list.component';
import { LessonDetailComponent } from './lesson-detail.component';

export const routes: Routes = [
	{ path: '', component: GradeSelectorComponent },
	{ path: 'grade-selector', component: GradeSelectorComponent },
	{ path: 'grade/:gradeId', component: ChapterListComponent },
	{ path: 'grade/:gradeId/chapter/:chapterId/lesson/:lessonId', component: LessonDetailComponent },
];
