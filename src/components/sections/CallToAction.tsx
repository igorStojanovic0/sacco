import { ArrowRight } from "lucide-react"

const CallToAction = () => {
    return (
        <section id="benefits" className="mx-auto w-full flex-1 py-0 bg-blue-600">
            <div className="md:container mx-auto flex flex-wrap justify-between items-center ">
                <div className="right w-full md:w-1/2 flex gap-5 flex-col text-white">
                    <h1 className="text-3xl font-bold">Easy follow up on your application</h1>
                    <p>Fill your application form, provide all information related to your application
                        including the needed loan, add attachments such as your work contract and copy of National ID.
                    </p>
                    <a href="/apply" className="rounded-lg hover:bg-yellow-400 text-black font-bold bg-yellow-500 py-2 px-4 w-full md:w-fit flex items-center gap-4 justify-center">
                        <span className="text-base">Apply now</span>
                        <ArrowRight />
                    </a>
                </div>
                <div className="left w-full md:w-1/2">
                    <img src="corporate-employee-preparing-remote-business-work.jpg" loading="lazy" className="w-3/4 mx-auto" alt="Apply here" />
                </div>
            </div>
        </section>
    )
}

export default CallToAction