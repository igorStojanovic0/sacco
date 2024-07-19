import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import getScrollAnimation from "../../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const features = [
  "Community Support",
  "Shared Goals",
]
const featuresContent = [
  "Save together with friends and family, providing mutual encouragement and accountability.",
  "Work towards common objectives, fostering a sense of teamwork and collective achievement.",
]


const features2 = [
  "Interactive Features",
  "Friendly Competition",
]

const featuresContent2 = [
  "The interactive dashboard and gamified challenges make saving money enjoyable and engaging.",
  "Healthy competition among group members keeps everyone motivated and on track.",
]

const features3 = [
  "Build Healthy Habits",
  "Achieve More Together",
  "Borrow from your group"
]

const featuresContent3 = [
  "Develop consistent saving habits with the support of your group.",
  "Reach your financial goals faster by pooling resources and encouraging each other.",
  "Need some cash, just request funds from your savings or your group. All you need is a guarantor."
]

const number = [
  0, 1
]

const number3 = [
  0, 1, 2
]


const Benefits = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="feature"
    >
      <h3 className="text-4xl lg:text-4xl m-auto font-bold leading-relaxed text-[rgb(50,86,166)] justify-center text-center">
        Benefits
      </h3>
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p  y-8 my-12 mt-20">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <Image
              src="/assets/Picture4.png"
              alt="VPN Illustrasi"
              layout="responsive"
              quality={100}
              height={300}
              width={300}
              className=" rounded-xl"
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>

          <motion.div className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12" variants={scrollAnimation}>
            <h3 className="text-2xl lg:text-2xl m-auto font-bold leading-relaxed text-[rgb(50,86,166)]">
              Collaborative Savings
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
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p  y-8 my-12">
        
        <ScrollAnimationWrapper>

          <motion.div className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12" variants={scrollAnimation}>
            <h3 className="text-2xl lg:text-2xl m-auto font-bold leading-relaxed text-[rgb(50,86,166)]">
            Fun and Engaging
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
                      {features2[num]}
                    </span>
                    <span>
                      {featuresContent2[num]}
                    </span>
                  </div>
                </motion.li>
              )
              )}
            </ul>
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <Image
              src="/assets/Picture7.png"
              alt="VPN Illustrasi"
              layout="responsive"
              quality={100}
              height={300}
              width={300}
              className=" rounded-xl"
            />
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p  y-8 my-12 mt-20">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <Image
              src="/assets/Picture5.png"
              alt="VPN Illustrasi"
              layout="responsive"
              quality={100}
              height={300}
              width={300}
              className=" rounded-xl"
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>

          <motion.div className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12" variants={scrollAnimation}>
            <h3 className="text-2xl lg:text-2xl m-auto font-bold leading-relaxed text-[rgb(50,86,166)]">
            Financial Growth
            </h3>
            {/* <p className="my-2 text-[#4F5665]">
              You can explore the features that we provide with fun and have their
              own functions each feature.
            </p> */}
            <ul className="text-[#4F5665] self-start list-inside ml-8 mt-10">
              {number3.map((num, index) => (
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
                      {features3[num]}
                    </span>
                    <span>
                      {featuresContent3[num]}
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

export default Benefits;
