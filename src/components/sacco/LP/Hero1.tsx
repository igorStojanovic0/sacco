"use client";
import { BiSolidBuildings } from "react-icons/bi";
import { RiMapPin2Fill, RiUser2Fill } from "react-icons/ri";
import HeroSearchBy from "../component/Hero/HeroSearchBy";
const SaccoHero = () => {
  return (
    <div
      className="w-full h-[40rem] bg-cover bg-center pt-48 bg-container"
      style={{ backgroundImage: "url('/img/back/tokyo.jpg')" }}
    >
      <div className="bg-black bg-opacity-30">
        <div className="relative overflow-hidden flex w-4/5 mx-auto items-center justify-center h-16">
          <div className="text-white text-3xl w-auto px-8 py-1 bg-[#324559] flex 
          items-center justify-center h-full z-10 max-lg:text-[1.1rem] max-md:text-[1rem]">
            Join the Twezimbe Savings Groups: <br className="md:hidden"/>Save Together, Grow Together!
          </div>
          <div className="absolute inset-0 z-0 mask-gradient"></div>
        </div>

        <div
          className="flex gap-5 justify-center items-center mt-[10rem] py-10 rounded-lg shadow-custom w-3/5 mx-auto
           px-[20px] max-xl:w-4/5 max-[865px]:flex-wrap max-[865px]:mt-[6rem] max-[714px]:w-4/5 max-[714px]:px-[10px] max-[714px]:mt-[1rem] "          
        >
            <HeroSearchBy
              Icon={RiMapPin2Fill}
              itemsText={'Locations'}
              itemName=""
            />
            <HeroSearchBy
              Icon={RiUser2Fill}
              itemsText={'User'}
              itemName=""
            />
            <HeroSearchBy
              Icon={BiSolidBuildings}
              itemsText={'Server'}
              itemName=""
            />
        </div>
      </div>
    </div>
  );
};
export default SaccoHero;
