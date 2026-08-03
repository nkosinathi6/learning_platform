import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SAMPLE_CONTENT } from './data';

@Component({
  selector: 'grade-selector',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './grade-selector.component.html',
  styleUrl: './grade-selector.component.css',
})
export class GradeSelectorComponent {
  readonly grades = SAMPLE_CONTENT;
}
