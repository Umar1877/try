import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function WorkCTA() {
  return (
    <section className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative px-6 py-16 sm:px-12 lg:px-16">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-display font-semibold text-white mb-4">
                Ready to Build Your Next Project?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Let&apos;s collaborate to create a digital solution that exceeds
                your expectations and drives your business forward.
              </p>
              <Link href={Routes.Contact}>
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-white/90 h-12 px-8 hover:cursor-pointer"
                >
                  Start a Conversation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
