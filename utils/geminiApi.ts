import { GeneratedContent } from "@/types/lessonPlan";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});
export async function generateLessonPlan(
  prompt: string
): Promise<GeneratedContent> {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const lessonPlan = JSON.parse(response.text());

    // console.log("Lesson Plan:", JSON.stringify(lessonPlan, null, 2));
    return lessonPlan;
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    throw error;
  }
}
