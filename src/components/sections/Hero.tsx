import { ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <div className="pt-6 pb-24  bg-[#013a6f]">
            <div className="px-5 md:container mx-auto flex flex-wrap-reverse justify-between items-center">
                <div className="w-full md:w-1/2 flex gap-10 flex-col">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white w-full md:w-4/5 text-center md:text-left">Twezimbe: Connect, Grow</h1>
                    <p className="text-base text-white w-full md:w-4/5 text-center md:text-left">Your All-in-One Platform for SACCO and Bereavement Fund Efficiency</p>
                    <div className="flex gap-5">
                    <a href="/apply" className="rounded-lg hover:bg-orange-300 text-[#013a6f] font-bold bg-orange-400 py-2 px-4 w-full md:w-fit flex items-center gap-4 justify-center">
                        <span className="text-base">Book Demo</span>
                        <ArrowRight />
                    </a>
                    <a href="/apply" className="rounded-lg hover:bg-orange-300 text-[#013a6f] font-bold bg-orange-400 py-2 px-4 w-full md:w-fit flex items-center gap-4 justify-center">
                        <span className="text-base">Show Interest</span>
                        <ArrowRight />
                    </a>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <img src="/assets/bg-home-1.jpg" loading="lazy" className="w-3/4 mx-auto mb-10" alt="Image by pch.vector on Freepik" />
                </div>
            </div>
        </div>
    )
}

export default Hero;