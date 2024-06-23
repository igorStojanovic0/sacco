const FeedBack = () => {
    return (
        <section id="benefits" className="px-5 mx-auto flex-1 pt-24 pb-0 w-full bg-[#013a6f] rounded-3xl">
            <div className="md:container mx-auto flex flex-wrap justify-between items-center">
                <div className="right w-full md:w-[49%] flex flex-col">
                    <h1 className="text-3xl font-bold mt-3 mb-7 text-white">
                        Why Choose Twezimbe?
                    </h1>
                    <p className="text-white">Effortlessly capture and manage member details to ensure seamless operations.
                        <br /><br />
                        Streamline loan applications, approvals, and disbursements for faster service within your group.
                        <br /><br />
                        Monitor member contributions accurately, fostering trust and engagement within your group.

                        Provide members with instant updates on their contributions and social funding activities.
                    </p>
                </div>
                <div className="left w-full md:w-[49%]">
                    <img src="/assets/bg-home.png" loading="lazy" className="w-1/2 mx-auto mb-10" alt="Apply here" />
                </div>
            </div>
        </section>
    )
}

export default FeedBack