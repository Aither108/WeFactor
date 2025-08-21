export type SurveyQuestion =
  | { id: string; type: 'scale'; label: string; min?: number; max?: number }
  | { id: string; type: 'single'; label: string; options: string[] }
  | { id: string; type: 'multi'; label: string; options: string[] }
  | { id: string; type: 'text'; label: string; placeholder?: string };

export type Survey = {
  slug: string;
  title: string;
  dueDate: string;
  isAnonymous: boolean;
  status: 'Open' | 'Closed';
  questions: SurveyQuestion[];
  minThreshold?: number;
};

export const surveysData: Survey[] = [
  {
    slug: 'q2-team-engagement',
    title: 'Q2 Team Engagement Survey',
    dueDate: 'June 30, 2024',
    status: 'Open',
    isAnonymous: true,
    minThreshold: 5,
    questions: [
      { id: 'engagement', type: 'scale', label: 'Overall, how engaged do you feel?', min: 1, max: 5 },
      { id: 'enablement', type: 'scale', label: 'I have the tools to do my job well', min: 1, max: 5 },
      { id: 'communication', type: 'single', label: 'Communication is effective across the team', options: ['Strongly disagree','Disagree','Neutral','Agree','Strongly agree'] },
      { id: 'wellbeing', type: 'multi', label: 'What best supports your wellbeing?', options: ['Work-life balance','Manager support','Flexibility','Benefits'] },
      { id: 'comments', type: 'text', label: 'Any comments to share?', placeholder: 'Your feedback…' },
    ],
  },
  {
    slug: 'product-feature-feedback',
    title: 'Product Feedback - New Feature',
    dueDate: 'June 25, 2024',
    status: 'Open',
    isAnonymous: false,
    minThreshold: 5,
    questions: [
      { id: 'usefulness', type: 'scale', label: 'How useful is the feature?', min: 1, max: 5 },
      { id: 'clarity', type: 'scale', label: 'The feature was easy to understand', min: 1, max: 5 },
      { id: 'mostLiked', type: 'text', label: 'What did you like most?' },
      { id: 'improve', type: 'text', label: 'What would you improve?' },
    ],
  },
];

export function getSurveyBySlug(slug: string): Survey | undefined {
  return surveysData.find(s => s.slug === slug);
}


