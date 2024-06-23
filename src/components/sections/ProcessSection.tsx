import ProgressCart from "../ProgressCard";

export type ProgressInfo = {
    picture: string;
    description: string;
    destination: string;
  }
  
  const process: ProgressInfo[] = [
    {
      picture: "progress2.png",
      description: "Fill applicaiton form here",
      destination: "/apply"
    },
    {
      picture: "progress3.png",
      description: "Upload needed attachments",
      destination: "/apply"
    },
    {
      picture: "progress1.png",
      description: "Get progress information",
      destination: "/account"
    },
    {
      picture: "progress4.png",
      description: "Recieve loan confirmation in few days",
      destination: "/account"
    },
  ];

const ProcessSection = () => {
  return (
    <section id="process" className="px-5 mx-auto flex-1 py-24 w-full bg-slate-100">
        <div className="mx-auto md:container flex flex-col gap-5 justify-center items-center">
          <h1 className="text-3xl font-bold text-center">Applying for a loan in SACCO made easy</h1>
          <h2 className="w-full md:w-1/2 text-center">Commited to give access to loans to every teacher in a reasonable period with transparent and effiscient applicaiton verification process.</h2>
          <div className="flex flex-wrap items-center justify-center">
            {process.map((p, index) => (
              <ProgressCart process={p} key={index} />
            ))}
          </div>
        </div>
      </section>
  )
}

export default ProcessSection