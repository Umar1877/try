import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Project = {
  id: string;
  projectName: string;
  category: string;
  client: string;
  year: string;
  liveProjectLink?: string;
  clientIntro?: string;
  problemStatement?:string;
  solution?: string;
  result?: string;
  challenges?: string[];
  ourApproach?: string[];
  imageUrl?: string | null;
  createdAt: string;
};

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="relative pt-16 overflow-hidden bg-zinc-950">
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[550px]">
        <Image
          src={project.imageUrl || "/placeholder.svg"}
          alt={project.projectName}
          fill
          priority
          sizes="(min-width: 640px) 100vw, (max-width: 1440px) 60vw, 100vw"
          className=""
        />
      </div>
      <div className="px-8 xl:px-36 border-b border-white/10">

        <div className=" pt-12 flex md:flex-row flex-col">

          <h1 className="font-display text-5xl pr-2 font-semibold tracking-tight text-white md:w-1/2 pb-7 md:pb-0 uppercase">

            {project.projectName}
          </h1>
          <div className=" flex md:w-1/2 text-white justify-between md:flex-row flex-col pb-7">

            <div className="flex flex-col pr-3 ">

              <h1 className="text-gray-600 font-extrabold text-xl lg:text-right">

                Category
              </h1>
              <p className="font-extrabold text-xl capitalize">
                {project.category}
              </p>
            </div>
            <div className="flex flex-col pr-3">

              <h1 className="text-gray-600 font-extrabold text-xl lg:text-right">

                Client
              </h1>
              <p className="font-extrabold text-xl capitalize">{project.client}</p>
            </div>
            <div>

              <h1 className="text-gray-600 font-extrabold text-xl lg:text-right">

                year
              </h1>
              <p className="font-extrabold text-xl capitalize"> {project.year}</p>
            </div>
          </div>
        </div>
        <div className="md:py-12 pb-7 flex md:flex-row flex-col text-white ">

          <div className=" md:w-1/3 pb-7 md:pb-0 ">

            {project.liveProjectLink && (

              <Link
                href={project.liveProjectLink}
                target="_blank"
                className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-3 px-4 w-42 justify-between"
              >
                Live Product
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

            )}
          </div>
          <div className=" md:flex-1">

            <p className="md:px-4 md:text-lg">
              {project.clientIntro}
            </p>
          </div>
        </div>
        <div className="pb-3 flex md:flex-row flex-col text-white ">

          <p className=" md:w-1/3 font-extrabold text-3xl pb-7">

            Problem Statement
          </p>
          <div className="flex flex-col flex-1 ">

            <p className=" md:px-4 md:pb-4 md:text-lg">
              {project.problemStatement}
            </p>
            <div className="flex flex-col md:flex-row ">

              <div className="flex flex-col md:w-1/2 pt-5 md:p-4">

                <h1 className="font-extrabold text-3xl pb-3">Solution</h1>
                <p className="md:text-lg">
                  {project.solution}
                </p>
              </div>
              <div className="flex flex-col md:w-1/2 pt-5 md:p-4">

                <h1 className="font-extrabold text-3xl pb-3">Results</h1>
                <p className="md:text-lg pb-5 md:pb-0 ">
                  {project.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
