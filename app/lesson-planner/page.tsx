"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { generateLessonPlan } from "@/utils/geminiApi"
import { getLessonPlannerPrompt } from "@/utils/prompt"
import { useToast } from "@/hooks/use-toast"
import { PDFDownloadLink } from "@react-pdf/renderer"
import LessonPlanPDF from "@/components/LessonPDF"
import { PlusCircle, Trash2 } from "lucide-react"
import isAuth from "@/components/withAuth"
import LogoutBtn from "@/components/LogoutBtn"
import { Skeleton } from "@/components/ui/skeleton"

import { LessonActivity, LessonPlan, GeneratedContent } from "@/types/lessonPlan"

const initialLessonPlan: LessonPlan = {
  topic: "",
  gradeLevel: "",
  mainConcept: "",
  subtopics: [""],
  materialsNeeded: [""],
  learningObjectives: [""],
  additionalNotes: "",
  lessonActivities: [{ section: "", duration: "", guide: "", remarks: "" }],
}

function LessonPlanner() {
  const { toast } = useToast()
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>(initialLessonPlan)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedLessonPlan = localStorage.getItem("lessonPlan")
    if (savedLessonPlan) {
      setLessonPlan(JSON.parse(savedLessonPlan))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("lessonPlan", JSON.stringify(lessonPlan))
  }, [lessonPlan])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setLessonPlan((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (
    field: keyof LessonPlan,
    index: number,
    key: string,
    value: string
  ): void => {
    const updatedArray = [...(lessonPlan[field] as Array<string | LessonActivity>)]
    if (typeof updatedArray[index] === "string") {
      updatedArray[index] = value
    } else {
      (updatedArray[index] as LessonActivity)[key as keyof LessonActivity] = value
    }
    setLessonPlan((prev) => ({ ...prev, [field]: updatedArray }))
  }

  const addArrayItem = (field: keyof LessonPlan, defaultItem: string | LessonActivity): void => {
    setLessonPlan((prev) => ({
      ...prev,
      [field]: [...(prev[field] as Array<string | LessonActivity>), defaultItem],
    }))
  }

  const removeArrayItem = (field: keyof LessonPlan, index: number): void => {
    const updatedArray = (lessonPlan[field] as Array<string | LessonActivity>).filter(
      (_, i) => i !== index
    )
    setLessonPlan((prev) => ({ ...prev, [field]: updatedArray }))
  }

  const resetForm = (): void => {
    localStorage.removeItem("lessonPlan")
    window.location.reload()
  }

  const submitPrompt = async (): Promise<void> => {
    try {
      setLoading(true)
      const prompt = getLessonPlannerPrompt(lessonPlan)
      const generatedContent: GeneratedContent = await generateLessonPlan(prompt)

      setLessonPlan({
        topic: generatedContent.subject || "",
        gradeLevel: generatedContent.gradeLevel || "",
        mainConcept: generatedContent.mainConcept || "",
        subtopics: Array.isArray(generatedContent.subtopics) ? generatedContent.subtopics : [""],
        materialsNeeded: Array.isArray(generatedContent.materialsNeeded) ? generatedContent.materialsNeeded : [""],
        learningObjectives: Array.isArray(generatedContent.learningObjectives)
          ? generatedContent.learningObjectives
          : [""],
        additionalNotes: lessonPlan.additionalNotes,
        lessonActivities: Array.isArray(generatedContent.lessonActivities)
          ? generatedContent.lessonActivities
          : [{ section: "", duration: "", guide: "", remarks: "" }],
      })
    } catch (error) {
      console.error("Error generating lesson plan:", error)
      toast({ description: "Error in generating lesson plan." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-2xl font-bold">Lesson Planner</CardTitle>
          <LogoutBtn />
        </CardHeader>
        <CardContent>
          {loading ?
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-40 w-full" />
            </div>
            : <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="basic-info">
                <AccordionTrigger>Basic Information</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="topic">Topic</Label>
                        <Input id="topic" name="topic" value={lessonPlan.topic} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gradeLevel">Grade Level</Label>
                        <Input id="gradeLevel" name="gradeLevel" value={lessonPlan.gradeLevel} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mainConcept">Main Concept</Label>
                      <Textarea
                        id="mainConcept"
                        name="mainConcept"
                        value={lessonPlan.mainConcept}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="subtopics">
                <AccordionTrigger>Subtopics</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {lessonPlan.subtopics.map((subtopic, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={subtopic}
                          onChange={(e) => handleArrayChange("subtopics", index, "", e.target.value)}
                        />
                        <Button onClick={() => removeArrayItem("subtopics", index)} variant="outline" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button onClick={() => addArrayItem("subtopics", "")} variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Subtopic
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="materials">
                <AccordionTrigger>Materials Needed</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {lessonPlan.materialsNeeded.map((material, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={material}
                          onChange={(e) => handleArrayChange("materialsNeeded", index, "", e.target.value)}
                        />
                        <Button onClick={() => removeArrayItem("materialsNeeded", index)} variant="outline" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button onClick={() => addArrayItem("materialsNeeded", "")} variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Material
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="objectives">
                <AccordionTrigger>Learning Objectives</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {lessonPlan.learningObjectives.map((objective, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={objective}
                          onChange={(e) => handleArrayChange("learningObjectives", index, "", e.target.value)}
                        />
                        <Button
                          onClick={() => removeArrayItem("learningObjectives", index)}
                          variant="outline"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button onClick={() => addArrayItem("learningObjectives", "")} variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Objective
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="activities">
                <AccordionTrigger>Lesson Activities</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {lessonPlan.lessonActivities.map((activity, index) => (
                      <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                        <Input
                          placeholder="Section"
                          value={activity.section}
                          onChange={(e) => handleArrayChange("lessonActivities", index, "section", e.target.value)}
                        />
                        <Input
                          placeholder="Duration"
                          value={activity.duration}
                          onChange={(e) => handleArrayChange("lessonActivities", index, "duration", e.target.value)}
                        />
                        <Input
                          placeholder="Guide"
                          value={activity.guide}
                          onChange={(e) => handleArrayChange("lessonActivities", index, "guide", e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Remarks"
                            value={activity.remarks}
                            onChange={(e) => handleArrayChange("lessonActivities", index, "remarks", e.target.value)}
                          />
                          <Button
                            onClick={() => removeArrayItem("lessonActivities", index)}
                            variant="outline"
                            size="icon"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={() =>
                        addArrayItem("lessonActivities", { section: "", duration: "", guide: "", remarks: "" })
                      }
                      variant="outline"
                      size="sm"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Activity
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="additional-notes">
                <AccordionTrigger>Additional Notes</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={lessonPlan.additionalNotes}
                      onChange={handleChange}
                      placeholder="Add any additional notes, reminders, or special considerations..."
                      className="min-h-[100px]"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button onClick={submitPrompt} disabled={loading}>
              {loading ? "Generating..." : "Generate Lesson Plan"}
            </Button>
            <Button type="button" onClick={resetForm}>
              Reset
            </Button>
          </div>
          {lessonPlan && (
            <PDFDownloadLink document={<LessonPlanPDF lessonPlan={lessonPlan} />} fileName="LessonPlan.pdf">
              {({ loading: pdfLoading }) => (
                <Button disabled={pdfLoading}>{pdfLoading ? "Preparing PDF..." : "Download PDF"}</Button>
              )}
            </PDFDownloadLink>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default isAuth(LessonPlanner)

