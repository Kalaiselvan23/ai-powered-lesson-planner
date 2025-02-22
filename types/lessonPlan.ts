export interface LessonActivity {
  section: string;
  duration: string;
  guide: string;
  remarks: string;
}

export interface LessonPlan {
  topic: string;
  gradeLevel: string;
  mainConcept: string;
  subtopics: string[];
  materialsNeeded: string[];
  learningObjectives: string[];
  additionalNotes: string;
  lessonActivities: LessonActivity[];
}

export interface GeneratedContent {
  subject?: string;
  gradeLevel?: string;
  mainConcept?: string;
  subtopics?: string[];
  materialsNeeded?: string[];
  learningObjectives?: string[];
  lessonActivities?: LessonActivity[];
}
