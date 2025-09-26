type Project = {
  id: string;
  projectName: string;
  category: string;
  client: string;
  year: string;
  liveProjectLink?: string;
  clientIntro?: string;
  solution?: string;
  result?: string;
  challenges?: string[];
  ourApproach?: string[];
  imageUrl?: string | null;
  createdAt: string;
};

export function CaseStudyProcess({ project }: { project: Project }) {
  return (
    <section className="px-8 xl:px-36">
      <div className=" text-white pb-3 border-b border-white/10 bg-zinc-950 ">

        <div className="flex md:flex-row flex-col pt-3">

          <div className="flex flex-col md:w-1/3">

            <h2 className="text-4xl font-bold uppercase pt-5">
              Challenges
            </h2>
            <p className="pt-5 pr-4 text-xl">
              Working on {project.projectName} presented some interesting challenges:
            </p>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap flex-1 ">

            {(project.challenges || []).map((step, index) => (
              <div
                key={index}
                className="flex flex-col flex-wrap md:w-1/2 md:p-4"
              >

                <div className="flex flex-col space-y-4">

                  <div className="flex flex-col">

                    <span className="text-5xl md:text-6xl font-bold">
                      {index + 1}
                    </span>
                    <div className="h-1 bg-emerald-400 w-12 mt-2 mb-6"></div>
                  </div>
                  <p className="text-xl md:text-lg leading-relaxed pb-5 md:pb-0">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" text-white pb-9 bg-zinc-950 pt-7">

        <h2 className="text-4xl font-bold mb-6 uppercase">
          Our Approach
        </h2>
        <div className="flex flex-col md:flex-row flex-wrap">

          {(project.ourApproach || []).map((step, index) => (
            <div key={index} className="flex flex-col md:w-1/3 md:p-4">

              <div className="flex flex-col space-y-4">

                <div className="flex flex-col">

                  <span className="text-5xl md:text-6xl font-bold">
                    {index + 1}
                  </span>
                  <div className="h-1 bg-emerald-400 w-12 mt-2 mb-6"></div>
                </div>
                <p className="text-xl md:text-lg leading-relaxed pb-5 md:pb-0">
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
