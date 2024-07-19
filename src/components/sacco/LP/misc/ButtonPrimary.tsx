import React, { ReactNode } from "react";

interface ButtonPrimaryProps {
  children: ReactNode;
  addClass?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ children, addClass = "" }) => {
  return (
    <button
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white font-semibold rounded-lg bg-[rgb(50,86,166)] hover:shadow-[rgb(50,86,166)]-md transition-all outline-none " +
        addClass
      }
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
