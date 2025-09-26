import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getCaseStudies } from "@/lib/case-studies";
import { Routes } from "@/lib/routes";

export function ProjectsList() {
  const caseStudies = getCaseStudies();

  const projects = caseStudies.map((study) => ({
    id: study.slug,
    title: study.title,
    description: study.summary,
    image: study.image,
    tags: study.category,
    technologies: study.technologies,
    client: study.client,
    link: `${Routes.Work}/${study.slug}`,
    category: study.category[0].toLowerCase(),
  }));

  return (
    <section className="py-12 bg-zinc-950 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9 ">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group  rounded overflow-hidden h-[650px] shadow-amber-400/30 flex flex-col "
            >
              <div className="relative min-h-96 rounded overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover  transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="py-6 flex-1 flex flex-col justify-between pr-0.5">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-zinc-400 flex-grow">{project.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-emerald-500/30 text-emerald-400"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={project.link} className="hover:cursor-pointer">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-emerald-400 hover:text-emerald-300 p-0 hover:cursor-pointer  hover:ring-0 hover:outline-0"
                    >
                      Case Study
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
