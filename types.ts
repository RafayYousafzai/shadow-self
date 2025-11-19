
export interface AnswerOption {
  label: string;
  value: 'A' | 'B' | 'C' | 'D' | 'E';
}

export interface Question {
  id: number;
  text: string;
  options: AnswerOption[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>;
  isFinished: boolean;
}

export interface CosmicDetails {
  birthDate: string;
  birthTime: string;
  birthCity: string;
}

export interface ParsedResult {
  rawText: string;
  title: string; // e.g. ENIGMATIC COQUETTE
  subtitle: string; // e.g. (INTJ 5w4)
  primaryArchetype: string;
  shadowArchetype: string;
  vibe: string;
  celebrities: string[];
  moodboardPrompt: string;
  brutalHonesty: string;
  matches: string;
  cosmic?: {
    zodiacHeader: string;
    analysis: string;
    universeMessage: string;
    prophecy: string[];
  };
}

export enum AppStage {
  LANDING,
  QUIZ,
  ANALYZING,
  RESULTS,
  ERROR
}
