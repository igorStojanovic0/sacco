import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";
import Stars from "../../../../public/assets/Icon/stars.svg";

interface TestimoniProps {
  listTestimoni?: {
    name: string;
    image: string;
    city: string;
    country: string;
    rating: string;
    testimoni: string;
  }[];
}

const Testimoni: React.FC<TestimoniProps> = ({
  listTestimoni = [
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Kampala",
      country: "Uganda",
      rating: "4.5",
      testimoni:
        `"Joining a Twezimbe Savings Group made saving money fun and social. We've reached our goals faster together!" – Maria, Group Member`,
    },
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        `"The weekly challenges and interactive dashboard keep us all motivated. Saving has never been this engaging." – Daniel, Community Member`,
    },
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Kampala",
      country: "Uganda",
      rating: "4.5",
      testimoni:
        `"Joining a Twezimbe Savings Group made saving money fun and social. We've reached our goals faster together!" – Maria, Group Member`,
    },
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        `"The weekly challenges and interactive dashboard keep us all motivated. Saving has never been this engaging." – Daniel, Community Member`,
    },
  ],
}) => {
  const settings = {
    dots: true,
    customPaging: function (i: number) {
      return (
        <div className="">
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all "></span>
        </div>
      );
    },
    dotsClass: "slick-dots w-max mt-20",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  return (
    <>
      <Slider
        {...settings}
        arrows={false}
        ref={setSliderRef}
        className="flex items-stretch justify-items-stretch flex-col"
      >
        {listTestimoni.map((listTestimonis, index) => (
          <div className="px-3 flex items-stretch" key={index}>
            <div className="border-2 border-[#DDDDDD] hover:border-[rgb(50,86,166)] transition-all rounded-lg p-8 flex flex-col">
              <div className="flex flex-col xl:flex-row w-full items-stretch xl:items-center">
                <div className="flex order-2 xl:order-1">
                  <Image
                    src={listTestimonis.image}
                    height={50}
                    width={50}
                    alt="Icon People"
                  />
                  <div className="flex flex-col ml-5 text-left">
                    <p className="text-lg text-[#4F5665] capitalize">
                      {listTestimonis.name}
                    </p>
                    <p className="text-sm text-[#4F5665] capitalize">
                      {listTestimonis.city}, {listTestimonis.country}
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center ml-auto order-1 xl:order-2">
                  <p className="text-sm">{listTestimonis.rating}</p>
                  <span className="flex ml-4">
                    <Image src={Stars} width={16} height={16} alt="" />
                  </span>
                </div>
              </div>
              <p className="mt-5 text-left">“{listTestimonis.testimoni}”.</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex w-full items-center justify-end -mt-20">
        <div className="flex flex-none justify-between w-auto mt-14">
          <div
            className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-[rgb(50,86,166)] border hover:bg-[rgb(50,86,166)] hover:text-white transition-all text-[rgb(50,86,166)] cursor-pointer"
            onClick={() => sliderRef?.slickPrev()}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </div>
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-[rgb(50,86,166)] border hover:bg-[rgb(50,86,166)] hover:text-white transition-all text-[rgb(50,86,166)] cursor-pointer"
            onClick={() => sliderRef?.slickNext()}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimoni;
