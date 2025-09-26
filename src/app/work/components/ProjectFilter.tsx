"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "All Projects" },
  { id: "web", name: "Web Development" },
  { id: "mobile", name: "Mobile Apps" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "healthcare", name: "Healthcare" },
  { id: "fintech", name: "FinTech" },
]

export function ProjectFilters() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <section className="py-12 bg-zinc-950" id="all-projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Our Projects</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-colors",
                activeFilter === category.id
                  ? "bg-emerald-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white",
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}



