"use client"

import { useCallback, useEffect, useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { CaseStudyForm } from "./components/CaseStudyForm"


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

export default function ProjectWorkspace() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/projects")
      const result = await response.json()
      if (result.success) {
        setProjects(result.items ?? [])
      } else {
        setProjects([])
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleProjectDelete = async (project: Project) => {
    if (!confirm(`Are you sure you want to permanently delete "${project.projectName}"?`)) {
      return
    }

    setDeletingId(project.id)
    try {
      const response = await fetch(`/api/projects?id=${project.id}`, {
        method: "DELETE",
      })
      const result = await response.json()

      if (!result.success) {
        alert(`Failed to delete project: ${result.message || "Unknown error"}`)
        return
      }

      setProjects((prev) => prev.filter((item) => item.id !== project.id))
      if (selectedProject?.id === project.id) {
        setSelectedProject(null)
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("Error deleting project. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  const handleProjectSaved = useCallback(async () => {
    await fetchProjects()
  }, [fetchProjects])

  return (
    <div className="flex min-h-screen bg-zinc-950 pt-16 ">
      <Sidebar
        projects={projects}
        loading={loading}
        selectedProjectId={selectedProject?.id ?? null}
        deletingId={deletingId}
        onCreateNew={() => setSelectedProject(null)}
        onProjectSelect={setSelectedProject}
        onProjectDelete={handleProjectDelete}
      />
      <div className="flex-1">
        <CaseStudyForm
          editingProject={selectedProject}
          onProjectSaved={handleProjectSaved}
          onClearSelection={() => setSelectedProject(null)}
        />
      </div>
    </div>
  )
}