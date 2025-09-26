import { FeaturedProject } from "./components/FeatureProject";
import { ProjectsList } from "./components/ProjectsList";
import { WorkCTA } from "./components/WorkCTA";
import { WorkHero } from "./components/WorkHero";

export const metadata = {
  title: "Our Work - DevNodes",
  description:
    "Explore our portfolio of successful projects and digital solutions.",
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <WorkHero />
      <FeaturedProject />
      <ProjectsList />
      <WorkCTA />
    </div>
  );
}
