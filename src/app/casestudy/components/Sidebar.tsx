"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Trash2 } from "lucide-react"

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

interface ProjectListProps {
  projects: Project[]
  loading: boolean
  selectedProjectId: string | null
  deletingId: string | null
  onCreateNew: () => void
  onProjectSelect: (project: Project) => void
  onProjectDelete: (project: Project) => Promise<void>
}

const PROJECT_PLACEHOLDER = "/case-study-presentation.png"

export function Sidebar({
  projects,
  loading,
  selectedProjectId,
  deletingId,
  onCreateNew,
  onProjectSelect,
  onProjectDelete,
}: ProjectListProps) {
  if (loading) {
    return (
      <div className="w-80 max-h-screen overflow-y-auto border-r border-gray-700 bg-zinc-950 p-4">
        <h2 className="mb-6 text-xl font-bold text-white text-balance">Projects</h2>
        <div className="space-y-4">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-24 animate-pulse rounded-lg bg-gray-800" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className=" max-h-screen   border-t border-gray-700 bg-zinc-950 p-4 overflow-y-scroll no-scrollbar w-96">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white text-balance">Projects ({projects.length})</h2>
        <Button
          type="button"
          size="sm"
          className="bg-emerald-500 text-white hover:bg-emerald-600"
          onClick={onCreateNew}
        >
          New
        </Button>
      </div>

      <div className="space-y-3">
        {projects.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-700 p-6 text-center text-sm text-gray-400">
            No projects yet. Create your first project!
          </div>
        ) : (
          projects.map((project) => {
            const isSelected = selectedProjectId === project.id

            return (
              <Card
                key={project.id}
                className={`border rounded-lg hover:bg-gray-800  ${isSelected ? "border-emerald-500" : "border-gray-700"} bg-zinc-950 p-0`}
              >
                <div className="flex items-center gap-3 p-3">
                  <div
                    className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg bg-gray-700 transition-opacity hover:opacity-80"
                    onClick={() => onProjectSelect(project)}
                  >
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl ?? PROJECT_PLACEHOLDER}
                        alt={project.projectName}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Image</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 cursor-pointer" onClick={() => onProjectSelect(project)}>
                    <h3 className="truncate text-sm font-medium text-white ">{project.projectName}</h3>
                    <p className="truncate text-xs text-gray-400">
                      {project.client} • {project.year}
                    </p>
                    <p className="text-xs capitalize text-gray-500">{project.category.replace(/[-_]/g, " ")}</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-400 hover:bg-gray-700 hover:text-white  focus-visible:ring-0"
                        disabled={deletingId === project.id}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-800 border border-gray-700">
                      <DropdownMenuItem
                        className="cursor-pointer text-red-400 hover:bg-red-900/20 hover:text-red-300"
                        disabled={deletingId === project.id}
                        onClick={() => onProjectDelete(project)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deletingId === project.id ? "Deleting..." : "Delete"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}