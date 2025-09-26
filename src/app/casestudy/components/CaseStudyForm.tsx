"use client"

import { useEffect, useId, useRef, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Plus, X } from "lucide-react"

interface Project {
  id: string
  projectName: string
  category: string
  client: string
  year: string
  liveProjectLink: string
  clientIntro: string
  problemStatement: string
  solution: string
  result: string
  challenges: string[]
  ourApproach: string[]
  imageUrl: string | null
  createdAt: string
}

interface ProjectFormData {
  projectName: string
  category: string
  client: string
  year: string
  liveProjectLink: string
  clientIntro: string
  problemStatement: string
  solution: string
  result: string
  challenges: string[]
  ourApproach: string[]
  projectImage: File | null
}

interface CaseStudyFormProps {
  editingProject: Project | null
  onProjectSaved: () => Promise<void>
  onClearSelection: () => void
}

export function CaseStudyForm({ editingProject, onProjectSaved, onClearSelection }: CaseStudyFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    category: "",
    client: "",
    year: "",
    liveProjectLink: "",
    clientIntro: "",
    problemStatement: "",
    solution: "",
    result: "",
    challenges: [""],
    ourApproach: [""],
    projectImage: null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const rawId = useId()
  const stableIdRef = useRef<string>("")

   useEffect(() => {
    if (submitMessage) {
      const timer = setTimeout(() => {
        setSubmitMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [submitMessage])   

  useEffect(() => {
    setSubmitMessage(null)

    if (editingProject) {
      setFormData({
        projectName: editingProject.projectName,
        category: editingProject.category,
        client: editingProject.client,
        year: editingProject.year,
        liveProjectLink: editingProject.liveProjectLink,
        clientIntro: editingProject.clientIntro,
        problemStatement: editingProject.problemStatement,
        solution: editingProject.solution,
        result: editingProject.result,
        challenges: editingProject.challenges.length > 0 ? editingProject.challenges : [""],
        ourApproach: editingProject.ourApproach.length > 0 ? editingProject.ourApproach : [""],
        projectImage: null,
      })
      setImagePreview(editingProject.imageUrl)
      setIsEditing(true)
      stableIdRef.current = editingProject.id
    } else {
      setFormData({
        projectName: "",
        category: "",
        client: "",
        year: "",
        liveProjectLink: "",
        clientIntro: "",
        problemStatement: "",
        solution: "",
        result: "",
        challenges: [""],
        ourApproach: [""],
        projectImage: null,
      })
      setImagePreview(null)
      setIsEditing(false)
      const cleaned = rawId.replace(/[:]/g, "")
      stableIdRef.current = `cs_${cleaned}_${Date.now()}`
    }
  }, [editingProject, rawId])

  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleArrayFieldChange = (field: "challenges" | "ourApproach", index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, idx) => (idx === index ? value : item)),
    }))
  }

  const addArrayField = (field: "challenges" | "ourApproach") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayField = (field: "challenges" | "ourApproach", index: number) => {
    setFormData((prev) => {
      if (prev[field].length === 1) {
        return prev
      }

      return {
        ...prev,
        [field]: prev[field].filter((_, idx) => idx !== index),
      }
    })
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFormData((prev) => ({ ...prev, projectImage: file }))

    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview((e.target?.result as string) ?? null)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    if (!formData.projectName.trim()) {
      setSubmitMessage({ type: "error", text: "Project name is required" })
      setIsSubmitting(false)
      return
    }

    const payload = new FormData()
    payload.append("projectName", formData.projectName)
    payload.append("category", formData.category)
    payload.append("client", formData.client)
    payload.append("year", formData.year)
    payload.append("liveProjectLink", formData.liveProjectLink)
    payload.append("clientIntro", formData.clientIntro)
    payload.append("problemStatement", formData.problemStatement)
    payload.append("solution", formData.solution)
    payload.append("result", formData.result)
    payload.append("challenges", JSON.stringify(formData.challenges.filter((item) => item.trim())))
    payload.append("ourApproach", JSON.stringify(formData.ourApproach.filter((item) => item.trim())))
    payload.append("id", stableIdRef.current)

    if (formData.projectImage) {
      payload.append("projectImage", formData.projectImage)
    }

    try {
      const response = await fetch("/api/projects", {
        method: isEditing ? "PUT" : "POST",
        body: payload,
      })
      const result = await response.json()

      if (!result.success) {
        setSubmitMessage({ type: "error", text: result.message || "Failed to save project" })
        return
      }

      const action = isEditing ? "updated" : "submitted"
      setSubmitMessage({ type: "success", text: `Project ${action} successfully!` })

      if (!isEditing) {
        const cleaned = rawId.replace(/[:]/g, "")
        stableIdRef.current = `cs_${cleaned}_${Date.now()}`
        setFormData({
          projectName: "",
          category: "",
          client: "",
          year: "",
          liveProjectLink: "",
          clientIntro: "",
          problemStatement: "",
          solution: "",
          result: "",
          challenges: [""],
          ourApproach: [""],
          projectImage: null,
        })
        setImagePreview(null)
      }

      await onProjectSaved()
      onClearSelection()
    } catch (error) {
      console.error("Error submitting project:", error)
      setSubmitMessage({ type: "error", text: "Error submitting form. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="border border-gray-700">
      <Card className="bg-zinc-950 max-h-screen overflow-y-scroll no-scrollbar">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-3xl font-bold text-white text-balance">
            {isEditing ? "Edit Case Study" : "Add New Case Study"}
          </CardTitle>
          <CardDescription className="text-gray-400 text-pretty">
            {isEditing
              ? "Update your project details and showcase your expertise."
              : "Share your latest work and highlight your expertise."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="project-image" className="text-sm font-medium text-white">
                Project Image
              </Label>
              <div className="flex w-full flex-col items-center justify-center">
                <label
                  htmlFor="project-image"
                  className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-900 transition-colors hover:bg-gray-800"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Project preview"
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <Upload className="mb-4 h-8 w-8 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                  )}
                  <input
                    id="project-image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-name" className="text-sm font-medium text-white">
                Project Name
              </Label>
              <Input
                id="project-name"
                placeholder="Enter project name"
                value={formData.projectName}
                onChange={(event) => handleInputChange("projectName", event.target.value)}
                className="bg-zinc-950 border border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-white">
                Category
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="bg-zinc-950border border-gray-600 text-white">
                  <SelectValue placeholder="Select project category" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border border-gray-600 text-white">
                  <SelectItem value="frontend">Frontend Development</SelectItem>
                  <SelectItem value="backend">Backend Development</SelectItem>
                  <SelectItem value="fullstack">Full Stack Development</SelectItem>
                  <SelectItem value="mobile">Mobile Development</SelectItem>
                  <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="ai-ml">AI/Machine Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="client" className="text-sm font-medium text-white">
                  Client
                </Label>
                <Input
                  id="client"
                  placeholder="Client name"
                  value={formData.client}
                  onChange={(event) => handleInputChange("client", event.target.value)}
                  className="bg-zinc-950 border border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium text-white">
                  Year
                </Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="2024"
                  value={formData.year}
                  onChange={(event) => handleInputChange("year", event.target.value)}
                  className="bg-zinc-950 border border-gray-600 text-white placeholder:text-gray-400 
             [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />


              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="live-link" className="text-sm font-medium text-white">
                Live Project Link
              </Label>
              <Input
                id="live-link"
                type="url"
                placeholder="https://example.com"
                value={formData.liveProjectLink}
                onChange={(event) => handleInputChange("liveProjectLink", event.target.value)}
                className="bg-zinc-950 border border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-intro" className="text-sm font-medium text-white">
                Project Overview
              </Label>
              <Textarea
                id="client-intro"
                placeholder="Write a short introduction about the client and their business…"
                value={formData.clientIntro}
                onChange={(event) => handleInputChange("clientIntro", event.target.value)}
                className="min-h-[100px] bg-zinc-950 border border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="problem-statement" className="text-sm font-medium text-white">
                Problem Statement
              </Label>
              <Textarea
                id="problem-statement"
                placeholder="Write a short introduction about the client and their business…"
                value={formData.problemStatement}
                onChange={(event) => handleInputChange("problemStatement", event.target.value)}
                className="min-h-[100px] bg-zinc-950 border border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution" className="text-sm font-medium text-white">
                Solution
              </Label>
              <Textarea
                id="solution"
                placeholder="Describe the solution you provided..."
                value={formData.solution}
                onChange={(event) => handleInputChange("solution", event.target.value)}
                className="min-h-[120px] bg-zinc-950 border border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="result" className="text-sm font-medium text-white">
                Result
              </Label>
              <Textarea
                id="result"
                placeholder="What were the outcomes and results achieved..."
                value={formData.result}
                onChange={(event) => handleInputChange("result", event.target.value)}
                className="min-h-[120px] bg-zinc-950 border border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-white">Challenges</Label>
                <Button
                  type="button"
                  onClick={() => addArrayField("challenges")}
                  className="bg-zinc-950 border border-gray-500 text-white hover:bg-gray-800"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Challenge
                </Button>
              </div>
              <div className="space-y-3">
                {formData.challenges.map((challenge, index) => (
                  <div key={`challenge-${index}`} className="flex gap-2">
                    <Input
                      placeholder={`Challenge ${index + 1}...`}
                      value={challenge}
                      onChange={(event) => handleArrayFieldChange("challenges", index, event.target.value)}
                      className="flex-1 bg-zinc-950 border border-gray-600 text-white placeholder:text-gray-400"
                    />
                    {formData.challenges.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeArrayField("challenges", index)}
                        className=" text-white border border-gray-500 hover:bg-gray-800"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-white">Our Approach</Label>
                <Button
                  type="button"
                  onClick={() => addArrayField("ourApproach")}
                  className="bg-zinc-950 border border-gray-500 text-white hover:bg-gray-800"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Approach
                </Button>
              </div>
              <div className="space-y-3">
                {formData.ourApproach.map((approach, index) => (
                  <div key={`approach-${index}`} className="flex gap-2">
                    <Input
                      placeholder={`Approach ${index + 1}...`}
                      value={approach}
                      onChange={(event) => handleArrayFieldChange("ourApproach", index, event.target.value)}
                      className="flex-1 bg-zinc-950 border border-gray-600 text-white placeholder:text-gray-400"
                    />
                    {formData.ourApproach.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeArrayField("ourApproach", index)}
                        className="border border-gray-500 text-white hover:bg-gray-800"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {submitMessage && (
              <div
                className={`rounded-lg p-4 text-center ${submitMessage.type === "success"
                  ? "border border-green-700 bg-green-900 text-green-200"
                  : "border border-red-700 bg-red-900 text-red-200"
                  }`}
              >
                {submitMessage.text}
              </div>
            )}

            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="bg-emerald-500 px-12 py-3 text-lg font-semibold text-white hover:bg-emerald-600 disabled:bg-gray-600"
              >
                {isSubmitting ? (isEditing ? "Updating..." : "Submitting...") : isEditing ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

    </div>
  )
}