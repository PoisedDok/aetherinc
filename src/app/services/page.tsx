"use client";

import Services from "@/components/sections/Services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      <div className="relative">
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>

        {/* Gradient overlay removed for transparency */}

        <div className="relative z-10 pt-28">
          <Services />
        </div>
      </div>
      <Footer />
    </div>
  );
} 