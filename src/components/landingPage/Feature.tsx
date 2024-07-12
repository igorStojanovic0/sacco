import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const features = [
  "Comprehensive Member Management",
  "Efficient Loan Processing",
  "Robust Risk Management",
  "Seamless Payment Solutions",
  "Real-Time Reporting",
  "Enhanced Contribution Tracking",
]

const featuresContent = [
  "Effortlessly capture and manage member details to ensure seamless operations.",
  "Streamline loan applications, approvals, and disbursements for faster service within your group.",
  "Mitigate risks with advanced guarantor and collateral management features.",
  "Simplify payment processing and track all financial transactions accurately.",
  "Access detailed reports and analytics to make informed decisions.",
  "Transparency and Accountability, Real-Time Updates",
]

const number = [
  0, 1, 2, 3, 4, 5
]

const Feature = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="feature"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p  y-8 my-12">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <Image
              src="/assets/Picture3.png"
              alt="VPN Illustrasi"
              layout="responsive"
              quality={100}
              height={414}
              width={508}
              className=" rounded-xl"
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>

          <motion.div className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12" variants={scrollAnimation}>
            <h3 className="text-3xl lg:text-4xl m-auto font-bold leading-relaxed text-[rgb(50,86,166)]">
              Why Choose Twezimbe
            </h3>
            {/* <p className="my-2 text-[#4F5665]">
              You can explore the features that we provide with fun and have their
              own functions each feature.
            </p> */}
            <ul className="text-[#4F5665] self-start list-inside ml-8 mt-10">
              {number.map((num, index) => (
                <motion.li
                  className="relative circle-check custom-list"
                  style={{ opacity: 1 }}
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                  key={num}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: .2
                    }
                  }}>
                  <div className=" flex flex-col gap-3 mt-3">
                    <span className=" font-bold">
                      {features[num]}
                    </span>
                    <span>
                      {featuresContent[num]}
                    </span>
                  </div>
                </motion.li>
              )
              )}
            </ul>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Feature;
