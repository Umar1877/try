
import { notFound } from "next/navigation";
import { CaseStudyHero } from "./components/Hero";

import { CaseStudyProcess } from "./components/Process";


 type Project = {
  id: string
  projectName: string
  category: string
  client: string
  year: string
  liveProjectLink?: string
  clientIntro?: string
  problemStatement:string
  solution?: string
  result?: string
  challenges?: string[]
  ourApproach?: string[]
  imageUrl?: string | null
  createdAt: string
}

async function getProject(id: string): Promise<Project | null> {
  const res = await fetch("https://try-five-ashy.vercel.app/api/projects", { cache: "no-store" })
  const data = await res.json()
  if (!data.success) return null
  return data.items.find((p: Project) => p.id === id) || null
}

type Props = {
  params: { id: string }
}

export default async function CaseStudyPage({ params }: Props) {
  const project = await getProject(params.id)

  if (!project) return notFound()

  return (
    <div className="min-h-screen bg-zinc-950">
      <CaseStudyHero project={project} />
      <CaseStudyProcess project={project} />
    </div>
  )
}

