import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
}

export default function PublicHomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      {/* {showHero && <Hero />} */}
      <div className="fullWidth md:container mx-auto flex-1 py-10">
        {children}
      </div>
      <Footer />
    </div>
  );
};
