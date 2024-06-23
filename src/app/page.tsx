"use client"

import HelmetComponent from "@/components/HelmetComponent";
import FastAndEffiscient from "@/components/sections/FastAndEffiscient";
import FeedBack from "@/components/sections/FeedBack";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HelmetComponent title="Welcome to QuickSacco" description="The quickest way to apply for a Loan in SACCO" />
      <Header />
      <Hero/>
      <FastAndEffiscient />
      <FeedBack />
      <Footer/>
    </div>
  );
}
