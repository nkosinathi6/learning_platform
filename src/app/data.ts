export interface Question {
  id: string;
  text: string;
  choices: string[];
  answer: number;
}

export interface Lesson {
  id: string;
  title: string;
  tutorial: string;
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
            tutorial: '<p>Introduction to force and motion.</p>',
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
          {
            id: 'scientific-method-extrapolation',
            title: 'Scientific Method: Extrapolation in emf and internal resistance',
            tutorial: '<h3>Key ideas</h3><ul><li>Use the scientific method to investigate how the terminal potential difference changes as current increases.</li><li>Measure the emf and internal resistance of a cell using a graph of V against I.</li><li>Interpret the intercept and gradient of the linear graph.</li></ul><p><strong>Important terms:</strong> emf, internal resistance, terminal potential difference, current, extrapolation.</p>',
            videoUrl: 'https://www.youtube.com/embed/ThdI1FwYjBk?start=710',
            summary: 'This lesson explains how to use the scientific method to investigate a cell’s emf and internal resistance. Students learn to collect data, plot a graph of terminal potential difference against current, and use extrapolation to find the emf at the y-intercept and internal resistance from the gradient.',
            assessment: [
              {
                id: 'scientific-method-q1',
                text: 'What does the y-intercept of a graph of terminal potential difference against current represent?',
                choices: ['The current', 'The emf', 'The internal resistance', 'The resistance of the wire'],
                answer: 1,
              },
              {
                id: 'scientific-method-q2',
                text: 'What does the gradient of the graph represent?',
                choices: ['The emf', 'The current', 'The internal resistance', 'The terminal voltage'],
                answer: 2,
              },
              {
                id: 'scientific-method-q3',
                text: 'What is the purpose of extrapolating the graph?',
                choices: ['To change the current', 'To estimate the emf and internal resistance', 'To remove the cell', 'To measure the wire length'],
                answer: 1,
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
