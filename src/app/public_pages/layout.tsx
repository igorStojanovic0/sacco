import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import React from "react";


export default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className={`fullWidth md:container mx-auto flex-1 py-10`}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
