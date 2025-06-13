"use client";

import Services from "@/components/sections/Services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkflowsCarousel from "@/components/sections/WorkflowsCarousel";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Services />
      <WorkflowsCarousel />
      <Footer />
    </div>
  );
} 