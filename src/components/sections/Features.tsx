"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { BentoGrid, BentoGridItem } from "@/components/magicui/bento-grid"; 
// Import relevant icons for use cases
import { Briefcase, HeartPulse, Wrench, GraduationCap, Code, DollarSign, Home, Languages, Users, ShieldCheck, Database, BrainCircuit } from 'lucide-react'; 

// Use Case type (adapted from Feature)
interface UseCase {
  icon: React.ReactNode;
  title: string;
  description: string;
  className: string; 
  background?: React.ReactNode;
}

// Define icons for use cases
const BriefcaseIcon = <Briefcase className="h-6 w-6 text-blue-400" />;
const HeartPulseIcon = <HeartPulse className="h-6 w-6 text-red-400" />;
const WrenchIcon = <Wrench className="h-6 w-6 text-orange-400" />;
const GraduationCapIcon = <GraduationCap className="h-6 w-6 text-green-400" />;
const CodeIcon = <Code className="h-6 w-6 text-purple-400" />;
const DollarSignIcon = <DollarSign className="h-6 w-6 text-yellow-400" />;
const HomeIcon = <Home className="h-6 w-6 text-pink-400" />;
const LanguagesIcon = <Languages className="h-6 w-6 text-cyan-400" />;

// Use Cases array for Bento Grid layout
const useCases: UseCase[] = [
  {
    icon: BriefcaseIcon,
    title: "Digital Nomads: Unhackable Productivity",
    description: "Unsecured Wi-Fi exposes sensitive data. GURU provides offline translation, task management, and secure document processing—anywhere, anytime.",
    className: "lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-black opacity-50 group-hover/bento:opacity-70 transition-opacity"></div>
  },
  {
    icon: HeartPulseIcon,
    title: "Clinics: Secure Patient Insights",
    description: "Cloud uploads risk HIPAA/GDPR breaches. GURU processes vitals and notes locally with sensors & OmniParser, ensuring compliance.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-red-900/20 to-transparent"></div>
  },
   {
    icon: WrenchIcon,
    title: "Field Techs: Co-Pilot in Dead Zones",
    description: "No internet on remote sites? GURU uses OmniParser & AR for offline diagnostics and repair guides, minimizing downtime.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-orange-900/15 to-transparent"></div>
  },
  {
    icon: GraduationCapIcon,
    title: "Education: Accessible Learning",
    description: "Connectivity gaps limit personalized learning. GURU delivers offline, adaptive lessons and feedback, leveling the educational field.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-green-900/20 to-transparent"></div>
  },
  {
    icon: CodeIcon,
    title: "Developers: Privacy-First Playground",
    description: "Cloud costs and privacy risks stifle AI development. GURU offers an offline platform (Ollama, LangChain) for building local apps.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-transparent"></div>
  },
  {
    icon: DollarSignIcon,
    title: "Gig Workers: Offline Finance Wingman",
    description: "Cloud finance apps compromise data. GURU tracks earnings, forecasts taxes, and scans receipts securely offline.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-yellow-900/15 to-transparent"></div>
  },
  {
    icon: HomeIcon,
    title: "Elderly Care: Warmth, Not Wires",
    description: "Internet devices feel invasive. GURU offers offline med reminders, exercise guidance, fall detection, and companionship.",
    className: "lg:col-span-1", // Adjusted span
    background: <div className="absolute inset-0 bg-gradient-radial from-pink-900/20 to-transparent"></div>
  },
  {
    icon: LanguagesIcon,
    title: "Travelers: Your Pocket Translator",
    description: "Language barriers in remote areas? GURU translates speech and signs offline via OmniParser, beaming results to your phone.",
    className: "lg:col-span-2", // Adjusted span
    background: <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-black to-black opacity-50 group-hover/bento:opacity-70 transition-opacity"></div>
  }
];

// Features section props type (keeping ref name for compatibility)
interface FeaturesProps {
  featuresRef: React.RefObject<HTMLElement | null>;
}

export default function Features({ featuresRef }: FeaturesProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 }); // Trigger animation earlier
  
  return (
    <section 
      ref={featuresRef} // Keep the ref for scrolling from Navbar
      id="features" // Keep id for potential direct links, though Navbar link is removed
      className="relative bg-gradient-to-b from-black via-slate-950 to-black py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
       <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <RetroGrid cellSize={80} /> 
      </div>
    
      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <motion.div 
           initial={{ opacity: 0, y: -30 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
           transition={{ duration: 0.7, ease: "easeOut" }}
           className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
        >
          {/* Updated Title and Description */}
          <h2 
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
          >
            GURU: Solving Real-World Problems, Offline
          </h2>
          <p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Explore how GURU's private, on-device AI provides innovative solutions across diverse industries and personal needs—no cloud required.
          </p>
        </motion.div>

        {/* Use BentoGrid for layout */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.2 }
            }
          }}
          className="max-w-6xl mx-auto" // Ensure grid doesn't exceed max width
        >
          {/* Adjusted grid rows if needed, check layout with 8 items */}
          <BentoGrid className="lg:grid-rows-3"> 
            {useCases.map((useCase, i) => ( // Map over useCases
              // Apply motion to the div containing background and item
              <motion.div
                 key={useCase.title} // Use title for key
                 variants={{ hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                 className={cn(
                     "relative rounded-xl overflow-hidden", // Apply base styling here
                     useCase.className // Use className from useCase object
                 )}
              >
                {/* Background Element */} 
                {useCase.background || <div className="absolute inset-0 bg-white/5 group-hover/bento:bg-white/10 transition-colors duration-300"></div>}
                
                {/* BentoGridItem wrapper for content and positioning */}
                <div className="relative z-10 h-full"> 
                  <BentoGridItem
                    header={<div className="p-3 rounded-lg bg-black/10 shadow-inner flex items-center justify-center w-fit">{useCase.icon}</div>} // Use useCase icon
                    title={useCase.title} // Use useCase title
                    description={useCase.description} // Use useCase description
                    className={cn(
                        "group/bento hover:shadow-xl transition-shadow duration-300", 
                        "flex flex-col justify-between p-5 md:p-6 h-full" // Use flex for layout, adjust padding
                    )} 
                  />
                </div>
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>

      </div>
    </section>
  );
} 