import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Routes } from "@/lib/routes"

export function WorkHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(16,185,129,0.1),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-zinc-800/40 px-4 py-1.5">
            <span className="text-sm font-medium tracking-wide text-zinc-400">Our Portfolio</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-8">
            Showcasing Our{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </span>
          </h1>

          <p className="text-lg text-zinc-400 leading-relaxed mb-12">
            Explore our portfolio of successful projects that demonstrate our expertise in creating innovative,
            high-performance digital solutions for businesses across various industries.
          </p>

          <Link href={Routes.Contact}>
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white h-12 px-8 hover:cursor-pointer">
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

