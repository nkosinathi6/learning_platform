export interface Question {
  id: string;
  text: string;
  choices: string[];
  answer: number;
}

export interface Lesson {
  id: string;
  title: string;
  notes: string;
  videoUrl?: string;
  summary?: string;
  assessment?: Question[];
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Grade {
  id: string;
  title: string;
  chapters: Chapter[];
}

export const SAMPLE_CONTENT: Grade[] = [
  {
    id: '10',
    title: 'Grade 10',
    chapters: [
      {
        id: 'newtons-laws',
        title: "Newton's laws",
        lessons: [
          {
            id: 'lesson-1',
            title: 'Lesson 1: Force and Motion',
            notes: '<p>Introduction to force and motion.</p>',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            summary: 'Key ideas: inertia, F=ma, action-reaction.',
            assessment: [
              {
                id: 'q1',
                text: 'Which law states that an object at rest stays at rest unless acted on by a net external force?',
                choices: ['First law', 'Second law', 'Third law', 'Law of conservation of energy'],
                answer: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  { id: '11', title: 'Grade 11', chapters: [] },
  { id: '12', title: 'Grade 12', chapters: [] },
];
