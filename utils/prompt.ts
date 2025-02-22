import { LessonPlan } from "@/app/lesson-planner/page";
export const getLessonPlannerPrompt = (lessonPlan: LessonPlan) => {
  return `Generate a structured lesson plan in JSON format with the following details:
  
    - **Topic:** ${lessonPlan.topic}
    - **Grade Level:** ${lessonPlan.gradeLevel}
    - **Main Concept:** ${lessonPlan.mainConcept}
    - **Subtopics:** ${lessonPlan.subtopics}
    - **Materials Needed:** ${lessonPlan.materialsNeeded}
    - **Learning Objectives:** ${lessonPlan.learningObjectives}
  
    The lesson plan should strictly follow this structured format:
  
    {
      "date": "YYYY-MM-DD",
      "subject": "${lessonPlan.topic}",
      "gradeLevel": "${lessonPlan.gradeLevel}",
      "mainConcept": "${lessonPlan.mainConcept}",
      "subtopics": ${JSON.stringify(lessonPlan.subtopics)},
      "materialsNeeded": ${JSON.stringify(lessonPlan.materialsNeeded)},
      "learningObjectives": ${JSON.stringify(lessonPlan.learningObjectives)},
      "lessonActivities": [
        {
          "section": "Springboard Activity",
          "duration": "xx minutes",
          "guide": "Introduce the lesson with an engaging question or activity.",
          "remarks": ""
        },
        {
          "section": "Introduction",
          "duration": "xx minutes",
          "guide": "Explain the topic or review previous lessons for continuity.",
          "remarks": ""
        },
        {
          "section": "Main Discussion",
          "duration": "xx minutes",
          "guide": "Detailed explanation of the main concept with examples.",
          "remarks": ""
        },
        {
          "section": "Guided/Independent Activities",
          "duration": "xx minutes",
          "guide": "Students apply knowledge through activities or group work.",
          "remarks": ""
        },
        {
          "section": "Assessment/Evaluation",
          "duration": "xx minutes",
          "guide": "Assess student understanding through quizzes or discussions.",
          "remarks": ""
        },
        {
          "section": "Additional Notes",
          "duration": "",
          "guide": "Any extra details or closing remarks.",
          "remarks": ""
        }
      ]
    }
  
    Ensure the response strictly follows this structure in **valid JSON format**.`;
};
