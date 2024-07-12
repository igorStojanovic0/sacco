import React, { ReactNode } from "react";

interface ButtonOutlineProps {
  children: ReactNode;
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({ children }) => {
  return (
    <button className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-[rgb(50,86,166)] text-[rgb(50,86,166)] bg-white outline-none rounded-l-full rounded-r-full capitalize hover:bg-[rgb(50,86,166)] hover:text-white transition-all hover:shadow-[rgb(50,86,166)]">
      {children}
    </button>
  );
};

export default ButtonOutline;
