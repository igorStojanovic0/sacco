import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import Maps from "../../../public/assets/HugeGlobal.svg";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import Testimoni from "./Testimoni";
import ButtonPrimary from "./misc/ButtonPrimary";

const About = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="bg-gradient-to-b from-[#F8F8F8] to-white w-full py-14"
      id="about"
    >
      <div
        className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      >
        <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p  y-8 my-12">
          <ScrollAnimationWrapper>
            <motion.div className="flex flex-col items-start justify-center ml-auto w-full lg:w-full" variants={scrollAnimation}>
              <h3 className="text-3xl lg:text-4xl m-auto font-bold leading-relaxed text-[rgb(50,86,166)]">
                About Twezimbe platform
              </h3>
              <p className="my-2 text-[#4F5665] mt-10">
                Twezimbe is a cutting-edge, all-in-one solution designed to revolutionize the management of SACCOs (Savings and Credit Cooperative Organizations), Group Bereavement Fund and Social Fundraising.<br></br>
                Our platform offers a comprehensive suite of tools and features that streamline operations, enhance transparency, and empower your community to thrive.<br></br><br></br>
                With a focus on user-friendly design and robust functionality, Twezimbe ensures that managing member contributions, loans, and social funding is both efficient and effective.
                Even more, create your family tree and know your roots. Who is your great, great grandfather?
              </p>
            </motion.div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="flex w-full justify-end">
            <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
              <Image
                src="/assets/Picture1.png"
                alt="VPN Illustrasi"
                layout="responsive"
                quality={100}
                height={414}
                width={508}
                className=" rounded-xl"
              />
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </div>
      <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="flex flex-col w-full my-16">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[rgb(50,86,166)] leading-relaxed w-9/12 sm:w-6/12 lg:w-4/12 mx-auto">
              Huge Global Usage of Twezimbe{" "}
            </motion.h3>
            <motion.p className="leading-normal  mx-auto my-2 w-10/12 sm:w-7/12 lg:w-6/12" variants={scrollAnimation}>
              See locations where customers are using this platform.
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <motion.div className="py-12 w-full px-8 mt-16" variants={scrollAnimation}>
              <Image src={Maps} className=" w-full h-auto" width={100} height={100} alt="" />
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
        <div className="flex flex-col w-full my-16" id="testimoni">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[rgb(50,86,166)] leading-normal w-9/12 sm: lg:w-4/12 mx-auto">
              Trusted by Thousands of Happy Customer{" "}
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12"
            >
              These are the stories of our customers who have joined us with great
              pleasure when using this crazy feature.
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="w-full flex flex-col py-12">
            <motion.div variants={scrollAnimation}>
              <Testimoni />
            </motion.div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="relative w-full mt-16">
            <motion.div variants={scrollAnimation} custom={{ duration: 3 }}>
              <div className="absolute rounded-xl  py-8 sm:py-14 px-6 sm:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center z-10 bg-[rgb(240,243,251)]">
                <div className="flex flex-col text-left w-10/12 sm:w-7/12 lg:w-7/12 mb-6 sm:mb-0">
                  <h5 className="text-[rgb(50,86,166)] text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium">
                    Ready to transform your SACCO, Fundraising and Bereavement Fund management?
                  </h5>
                </div>
                <ButtonPrimary>Get Started</ButtonPrimary>
              </div>
              <div
                className="absolute bg-[#0B132A] opacity-5 w-11/12 roudned-lg h-60 sm:h-56 top-0 mt-8 mx-auto left-0 right-0"
                style={{ filter: "blur(114px)" }}
              ></div>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default About;
