import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import HitCoach from "@/public/images/HitCoach.png";
import HitCoachLarge from "@/public/images/HitCoachLarge.png";
import { Routes } from "@/lib/routes";

export function FeaturedProject() {
  const featureProject = {
    id: 1,
    slug: "hitai-combat-training",
    title: "HITAI AI-Powered Combat Training",
    client: "HITAI",
    summary:
      "An AI-driven combat sports training platform that provides real-time performance analytics, instant feedback, and gamified workouts to enhance athletic development.",
    featuredImage: HitCoachLarge,
    image : HitCoach,
    category: ["SportsTech", "AI", "Web App"],
    tags: ["AI Coaching", "Combat Sports", "Real-time Analytics"],
    technologies: ["Computer Vision", "AI", "React", "Node.js", "AWS"],
    timeline: "8 Months",
    challenge: {
      title: "Revolutionizing Combat Sports Training",
      description:
        "Traditional combat sports training lacks precision, real-time feedback, and personalization, leading to inefficient progress and increased injury risks. Coaches and athletes struggle to analyze performance effectively, limiting their ability to optimize techniques and prevent mistakes.",
      bulletPoints: [
        "Lack of real-time feedback for athletes and coaches",
        "Inconsistent technique analysis leading to inefficient training",
        "High risk of injuries due to improper form",
        "Lack of motivation and engagement in traditional training methods",
      ],
    },
    solution: {
      title: "AI-Powered Combat Training Platform",
      description:
        "HITAI introduces an AI-driven training platform that leverages computer vision and real-time analytics to revolutionize combat sports training. The platform tracks movements, analyzes techniques, and provides instant feedback, ensuring athletes can refine their skills effectively.",
      bulletPoints: [
        "Real-time AI-driven movement tracking and analytics",
        "Instant performance feedback and technique improvement suggestions",
        "Gamified training sessions to enhance motivation",
        "Seamless integration with existing gym setups for easy adoption",
      ],
    },
    process: {
      title: "Our Development Approach",
      description:
        "We followed an iterative approach to ensure the platform met the needs of athletes and coaches while delivering real-time accuracy and seamless user experience.",
      steps: [
        {
          title: "Research & Requirements Gathering",
          description:
            "We collaborated with combat sports experts and athletes to understand key pain points and training challenges.",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          title: "AI & Computer Vision Development",
          description:
            "Our team developed AI algorithms to track movement, analyze techniques, and deliver real-time feedback.",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          title: "Gamification & Engagement Features",
          description:
            "We introduced gamified elements to enhance motivation and make training more interactive.",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          title: "Testing & Performance Optimization",
          description:
            "The platform was tested with athletes across different skill levels to ensure accuracy and usability.",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          title: "Deployment & Continuous Improvement",
          description:
            "We launched the platform with continuous updates based on user feedback to refine the experience.",
          image: "/placeholder.svg?height=400&width=600",
        },
      ],
    },
    results: {
      title: "Impact & Performance Improvements",
      description:
        "HITAI’s AI-powered training platform has significantly improved the way athletes train, making combat sports coaching more data-driven and effective.",
      stats: [
        {
          value: "60%",
          label: "Improvement in training efficiency",
        },
        {
          value: "75%",
          label: "Reduction in injury risk",
        },
        {
          value: "90%",
          label: "Athlete satisfaction with AI training",
        },
        {
          value: "4x",
          label: "Faster skill improvement rate",
        },
      ],
      bulletPoints: [
        "Athletes experience faster skill development through real-time feedback",
        "Coaches can analyze performance with precision, improving training strategies",
        "Reduction in injuries due to AI-powered form corrections",
        "Higher athlete engagement and motivation through gamified training",
      ],
    },
    testimonial: {
      quote:
        "HITAI has completely changed the way we train. The real-time feedback and AI-driven insights have taken our coaching to a whole new level.",
      author: "John Doe",
      position: "Head Coach",
      company: "Elite Combat Academy",
      image: "/placeholder.svg?height=100&width=100",
    },
    gallery: {
      title: "Platform Highlights",
      images: [
        {
          src: "/placeholder.svg?height=600&width=800",
          alt: "AI Analytics Dashboard",
          caption: "Detailed analytics of athlete performance and technique.",
        },
        {
          src: "/placeholder.svg?height=600&width=800",
          alt: "Real-time Feedback Display",
          caption: "Instant performance insights through AI tracking.",
        },
        {
          src: "/placeholder.svg?height=600&width=800",
          alt: "Gamified Training Session",
          caption: "Engaging workouts designed to keep athletes motivated.",
        },
        {
          src: "/placeholder.svg?height=600&width=800",
          alt: "AI Movement Tracking",
          caption: "Precision tracking to refine combat techniques.",
        },
      ],
    },
    nextProject: "ai-fitness-tracker",
  };
  return (
    <section className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-2xl text-white/60">FEATURED PROJECT</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video overflow-hidden rounded-lg gradient-border">
            <Image
              src={featureProject.featuredImage}
              alt="HealthTech Platform"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {featureProject.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-emerald-500/30 text-emerald-400"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="text-3xl font-bold text-white">
              {featureProject.title}
            </h3>
            <p className="text-zinc-400 text-lg">{featureProject.summary}</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-zinc-500 uppercase tracking-wider mb-1">
                    Client
                  </h4>
                  <p className="text-white">{featureProject.client}</p>
                </div>
                <div>
                  <h4 className="text-sm text-zinc-500 uppercase tracking-wider mb-1">
                    Timeline
                  </h4>
                  <p className="text-white">{featureProject.timeline}</p>
                </div>
                <div>
                  <h4 className="text-sm text-zinc-500 uppercase tracking-wider mb-1">
                    Services
                  </h4>
                  {featureProject.tags.map((item, index) => (
                    <p className="text-white" key={index}>
                      {item}
                    </p>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm text-zinc-500 uppercase tracking-wider mb-1">
                    Tech Stack
                  </h4>
                  {featureProject.technologies.map((item, index) => (
                    <p className="text-white" key={index}>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-4">
             <Link href = {`${Routes.Work}/${featureProject.slug}`}>
             <Button className="bg-emerald-500 hover:bg-emerald-600 text-white hover:cursor-pointer">
                View Case Study
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
             </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
