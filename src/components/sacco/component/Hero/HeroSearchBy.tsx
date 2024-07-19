
"use client";

import React from "react";
import { IconType } from "react-icons";

interface ISearchbyItems {
    Icon: IconType;
    itemsText: string;
    itemName: string;
  }

const HeroSearchBy: React.FC<ISearchbyItems> = ({
  Icon,
  itemsText,
  
}) => {
  return (
    <div className="flex gap-4 w-64 h-16 max-[660px]:w-[25rem] max-[660px]:gap-2 bg-gradient-to-b to-[#cca55a] from-[#a67c00] 
    rounded justify-center items-center shadow-xl transition-all duration-300 ease-in-out
    hover:brightness-75 
    ">
        <Icon className="text-gray-800" size={28} />
        <div className="text-xl text-white">{itemsText}</div>
    </div>
  );    
};
  
export default HeroSearchBy;
