"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { BentoGrid, BentoGridItem } from "@/components/magicui/bento-grid"; 
import { Bot, BrainCircuit, ShieldCheck, Gauge, Briefcase, Headphones, BookOpen, Globe, Users, Wallet } from 'lucide-react';
import { ShineBorder } from '@/components/magicui/shine-border';

// UseCases type
interface UseCase {
  icon: React.ReactNode;
  title: string;
  description: string;
  problem: string;
  solution: string;
  className: string; 
  background?: React.ReactNode;
}

// Define icons as ReactNode
const BotIcon = <Bot className="h-6 w-6 text-purple-400" />;
const BriefcaseIcon = <Briefcase className="h-6 w-6 text-cyan-400" />;
const ShieldCheckIcon = <ShieldCheck className="h-6 w-6 text-green-400" />;
const GaugeIcon = <Gauge className="h-6 w-6 text-red-400" />;
const HeadphonesIcon = <Headphones className="h-6 w-6 text-yellow-400" />;
const BookOpenIcon = <BookOpen className="h-6 w-6 text-blue-400" />;
const GlobeIcon = <Globe className="h-6 w-6 text-orange-400" />;
const UsersIcon = <Users className="h-6 w-6 text-indigo-400" />; 
const WalletIcon = <Wallet className="h-6 w-6 text-pink-400" />;

// UseCases array for Bento Grid layout
const useCases: UseCase[] = [
  {
    icon: BotIcon,
    title: "Personal Privacy Companion for Digital Nomads",
    description: "Meet GURU: a pocket-sized, NVIDIA Jetson-powered ally.",
    problem: "Digital nomads thrive on freedom, working from cafes, airports, and co-working hubs. But unsecured Wi-Fi turns cloud-based tools into ticking time bombs—exposing sensitive data to hackers.",
    solution: "It delivers real-time translation, task management, and secure document processing—no internet required. Pair it with a mic and camera for hands-free brilliance, and it's the ultimate travel companion for the untethered worker.",
    className: "lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-black opacity-50 group-hover/bento:opacity-70 transition-opacity"></div>
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Healthcare Assistant for Clinics",
    description: "GURU steps in as a medical marvel.",
    problem: "Clinics need real-time patient insights to save lives, but cloud uploads risk catastrophic breaches under HIPAA and GDPR. Compliance isn't negotiable—it's everything.",
    solution: "Equipped with sensors (think pulse oximeters), a mic for transcription, and OmniParser to scan notes or images, it processes vitals and flags issues—all locally. It's a doctor's trusted, silent partner.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-green-900/20 to-transparent"></div>
  },
  {
    icon: GaugeIcon,
    title: "Hands-Free Field Technician Co-Pilot",
    description: "GURU goes rugged.",
    problem: "Field techs on oil rigs or wind farms battle breakdowns in dead zones—no internet, no backup. Delays mean lost revenue and rising stakes.",
    solution: "Worn with a camera and mic, it uses OmniParser to diagnose gear on the spot and overlays AR repair guides. LangChain digs up manuals instantly—all offline. It's a lifeline when the grid can't help.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-red-900/20 to-transparent"></div>
  },
  {
    icon: BookOpenIcon,
    title: "Accessible Education Tutor for Underserved Communities",
    description: "GURU becomes a tireless tutor.",
    problem: "Kids in rural or low-income areas are locked out of personalized learning—cost and connectivity gaps turn education into a privilege, not a right.",
    solution: "Offline, it delivers adaptive STEM lessons, real-time feedback, and speech-to-text for accessibility. Teachers tweak it to fit local needs, leveling the playing field.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent"></div>
  },
  {
    icon: BriefcaseIcon,
    title: "Developer Playground for Privacy-First Apps",
    description: "GURU is their canvas.",
    problem: "Developers hunger for AI tools, but cloud costs, latency, and privacy risks stifle their creativity. They need freedom, not shackles.",
    solution: "Powered by Ollama, LangChain, and Jetson Orin, it's an open platform for building smart home controls, robotics, or IoT apps—all local. AetherInc's SDK makes it a breeze to customize.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-cyan-900/20 to-transparent"></div>
  },
  {
    icon: WalletIcon,
    title: "Personal Finance Wingman for Gig Workers",
    description: "GURU is their offline money mentor.",
    problem: "Gig workers swim in chaos—irregular pay, tax headaches, and budgeting woes. Cloud finance apps promise help but sell out their data. Trust is shattered.",
    solution: "It tracks earnings, forecasts taxes, and scans receipts with OmniParser—all voice-activated and leak-proof. It's a CPA that fits in your pocket.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-pink-900/20 to-transparent"></div>
  },
  {
    icon: UsersIcon,
    title: "Elderly Care Companion for Aging Populations",
    description: "GURU is a friendly, offline caregiver.",
    problem: "Seniors living solo need daily support and emergency alerts, but internet-reliant devices feel invasive and impersonal. They deserve warmth, not wires.",
    solution: "It reminds them of meds, guides exercises, and detects falls with sensors—alerting family if trouble strikes. Its conversational charm melts loneliness away.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 to-transparent"></div>
  },
  {
    icon: GlobeIcon,
    title: "Real-Time Translator for Global Travelers",
    description: "GURU is a pocket translator.",
    problem: "Travelers stumble over language barriers in remote corners with no Wi-Fi. Miscommunication turns adventure into aggravation.",
    solution: "With a mic and camera, it decodes speech and signs offline via OmniParser, beaming translations to your phone. Lightweight and relentless, it's built for the road.",
    className: "lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-black opacity-50 group-hover/bento:opacity-70 transition-opacity"></div>
  },
];

// Feature section props type
interface FeaturesProps {
  featuresRef: React.RefObject<HTMLElement | null>;
}

export default function Features({ featuresRef }: FeaturesProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 }); // Trigger animation earlier
  
  return (
    <section 
      ref={featuresRef} // Keep the ref for scrolling from Navbar
      id="features" 
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
          <h2 
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
          >
            Why GURU is Revolutionary
          </h2>
          <p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Your digital companion for research, data analysis, and everyday challenges. GURU combines powerful capabilities with an intuitive interface that understands what you need and delivers results instantly.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase.title} 
                variants={{ hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                className={cn(
                  "relative rounded-xl overflow-hidden h-full bg-black/20 border border-white/10 shadow-lg group",
                  useCase.className
                )}
              >
                {/* Background Element */} 
                {useCase.background || <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-300"></div>}
                
                {/* Content */}
                <div className="relative z-10 h-full p-6 flex flex-col">
                  {/* Header with icon and title */}
                  <div className="mb-4 flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-black/30 shadow-inner flex items-center justify-center">
                      {useCase.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white leading-tight">{useCase.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{useCase.description}</p>
                    </div>
                  </div>
                  
                  {/* Problem & Solution */}
                  <div className="mt-4 space-y-4 flex-grow">
                    <div className="bg-black/20 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">Problem:</h4>
                      <p className="text-gray-400 text-sm">{useCase.problem}</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">Solution:</h4>
                      <p className="text-gray-400 text-sm">{useCase.solution}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 