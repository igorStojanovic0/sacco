import Image from "next/image";
import Facebook from "../../../../../public/assets/Icon/facebook.svg";
import Instagram from "../../../../../public/assets/Icon/instagram.svg";
import Twitter from "../../../../../public/assets/Icon/twitter.svg";
import LogoVPN from "../../../../../public/logo.png";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[rgb(17,22,42)] to-[rgb(23,54,89)] pt-44 pb-24">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-2 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start gap-4 -mt-8">
          <Image src={LogoVPN} width={220} height={32} alt="" className="" />
          <p className="mb-4 text-[#AFB5C0]">
            Your all-in-one platform for SACCO & Bereavement Fund Efficiency
          </p>
          <div className="flex w-full mt-2 mb-8 -mx-2">
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <Image src={Facebook} width={24} height={24} alt="" />
            </div>
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <Image src={Twitter} width={24} height={24} alt="" />
            </div>
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <Image src={Instagram} width={24} height={24} alt="" />
            </div>
          </div>
          <p className="text-[#AFB5C0] -mt-4">©{new Date().getFullYear()} - Twezimbe</p>
        </div>
        <div className=" row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-white mb-4 font-medium text-lg">Company</p>
          <ul className="text-[#4F5665] ">
            <li className="my-2 hover:text-[rgb(50,86,166)] text-[#AFB5C0] cursor-pointer transition-all">
              Home{" "}
            </li>
            <li className="my-2 hover:text-[rgb(50,86,166)] text-[#AFB5C0] cursor-pointer transition-all">
              About Us{" "}
            </li>
            <li className="my-2 hover:text-[rgb(50,86,166)] text-[#AFB5C0] cursor-pointer transition-all">
              Contact{" "}
            </li>
            <li className="my-2 hover:text-[rgb(50,86,166)] text-[#AFB5C0] cursor-pointer transition-all">
              Our Blog{" "}
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-white mb-4 font-medium text-lg">Get In Touch</p>
          <ul className="text-[#4F5665]">
            <li className="my-2 hover:text-[rgb(50,86,166)] text-[#AFB5C0] cursor-pointer transition-all">
              4th floor Block B, Ntinda{" "}
            </li>
            <li className="my-2 hover:text-[rgb(50,86,166)] text-[#AFB5C0] cursor-pointer transition-all">
              Complex, Kampala-Uganda{" "}
            </li>
            <li className="my-2 hover:text-[rgb(50,86,166)] text-[#AFB5C0] cursor-pointer transition-all">
              +256-782-61033301{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
