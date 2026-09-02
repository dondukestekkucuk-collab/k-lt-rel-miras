export interface StudentSession {
  username: string;
  grade: string;
  schoolName?: string;
  isLoggedIn: boolean;
  loginTime: string;
  completedTasks: string[];
  quizScores: Record<string, number>;
  oralHistoryAnswers: Record<string, string>;
  projectAnswers: Record<string, string>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  conceptTag: string;
}

export interface StationTask {
  id: string;
  title: string;
  description: string;
  iconName: string;
  placeholder?: string;
}

export interface GlossaryTerm {
  term: string;
  simpleDefinition: string;
  detailedDefinition: string;
  example: string;
  iconName: string;
  category: 'Somut Miras' | 'Somut Olmayan Miras' | 'Yöntem ve Bilim';
}
