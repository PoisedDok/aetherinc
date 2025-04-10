"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { BentoGrid, BentoGridItem } from "@/components/magicui/bento-grid"; 
import { 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  Factory,
  FileSearch,
  Bot,
  ShieldCheck,
  Users,
  Headphones,
  Globe,
  Briefcase,
  Heart,
  FileText,
  Cpu
} from 'lucide-react';

// Case Study type
interface CaseStudy {
  icon: React.ReactNode;
  title: string;
  problem: string;
  solution: string;
  stats: { label: string; value: string }[];
  className: string;
  background?: React.ReactNode;
}

// Define icons as ReactNode
const NomadIcon = <Briefcase className="h-6 w-6 text-cyan-400" />;
const HealthcareIcon = <Stethoscope className="h-6 w-6 text-green-400" />;
const TechnicianIcon = <Factory className="h-6 w-6 text-blue-400" />;
const EducationIcon = <GraduationCap className="h-6 w-6 text-yellow-400" />;
const DeveloperIcon = <Cpu className="h-6 w-6 text-purple-400" />;
const FinanceIcon = <FileText className="h-6 w-6 text-orange-400" />;
const ElderlyIcon = <Heart className="h-6 w-6 text-red-400" />;
const TranslatorIcon = <Globe className="h-6 w-6 text-indigo-400" />;

// Case Studies array for Bento Grid layout
const caseStudies: CaseStudy[] = [
  {
    icon: NomadIcon,
    title: "Personal Privacy Companion for Digital Nomads",
    problem: "Digital nomads thrive on freedom, working from cafes, airports, and co-working hubs. But unsecured Wi-Fi turns cloud-based tools into ticking time bombs—exposing sensitive data to hackers.",
    solution: "Meet GURU: a pocket-sized, NVIDIA Jetson-powered ally. It delivers real-time translation, task management, and secure document processing—no internet required. Pair it with a mic and camera for hands-free brilliance, and it's the ultimate travel companion for the untethered worker.",
    stats: [
      { label: "Data Privacy", value: "100%" },
      { label: "Offline Capability", value: "Complete" },
      { label: "Remote Workers Served", value: "100K+" }
    ],
    className: "lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-black to-black opacity-50 group-hover/bento:opacity-70 transition-opacity"></div>
  },
  {
    icon: HealthcareIcon,
    title: "Secure Healthcare Assistant for Clinics",
    problem: "Clinics need real-time patient insights to save lives, but cloud uploads risk catastrophic breaches under HIPAA and GDPR. Compliance isn't negotiable—it's everything.",
    solution: "GURU steps in as a medical marvel. Equipped with sensors (think pulse oximeters), a mic for transcription, and OmniParser to scan notes or images, it processes vitals and flags issues—all locally. It's a doctor's trusted, silent partner.",
    stats: [
      { label: "HIPAA Compliant", value: "100%" },
      { label: "Diagnostic Speed", value: "+37%" },
      { label: "Data Breaches", value: "Zero" }
    ],
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-green-900/20 to-transparent"></div>
  },
  {
    icon: TechnicianIcon,
    title: "Hands-Free Field Technician Co-Pilot",
    problem: "Field techs on oil rigs or wind farms battle breakdowns in dead zones—no internet, no backup. Delays mean lost revenue and rising stakes.",
    solution: "GURU goes rugged. Worn with a camera and mic, it uses OmniParser to diagnose gear on the spot and overlays AR repair guides. LangChain digs up manuals instantly—all offline. It's a lifeline when the grid can't help.",
    stats: [
      { label: "Downtime Reduction", value: "42%" },
      { label: "Repair Accuracy", value: "+78%" },
      { label: "Connectivity Needed", value: "None" }
    ],
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent"></div>
  },
  {
    icon: EducationIcon,
    title: "Accessible Education Tutor",
    problem: "Kids in rural or low-income areas are locked out of personalized learning—cost and connectivity gaps turn education into a privilege, not a right.",
    solution: "GURU becomes a tireless tutor. Offline, it delivers adaptive STEM lessons, real-time feedback, and speech-to-text for accessibility. Teachers tweak it to fit local needs, leveling the playing field.",
    stats: [
      { label: "Student Engagement", value: "+64%" },
      { label: "Test Score Improvement", value: "+27%" },
      { label: "Accessibility", value: "Universal" }
    ],
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-yellow-900/15 to-transparent"></div>
  },
  {
    icon: DeveloperIcon,
    title: "Developer Playground for Privacy-First Apps",
    problem: "Developers hunger for AI tools, but cloud costs, latency, and privacy risks stifle their creativity. They need freedom, not shackles.",
    solution: "GURU is their canvas. Powered by Ollama, LangChain, and Jetson Orin, it's an open platform for building smart home controls, robotics, or IoT apps—all local. AetherInc's SDK makes it a breeze to customize.",
    stats: [
      { label: "Development Speed", value: "+83%" },
      { label: "API Latency", value: "<5ms" },
      { label: "Privacy Control", value: "Total" }
    ],
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-transparent"></div>
  },
  {
    icon: FinanceIcon,
    title: "Personal Finance Wingman for Gig Workers",
    problem: "Gig workers swim in chaos—irregular pay, tax headaches, and budgeting woes. Cloud finance apps promise help but sell out their data. Trust is shattered.",
    solution: "GURU is their offline money mentor. It tracks earnings, forecasts taxes, and scans receipts with OmniParser—all voice-activated and leak-proof. It's a CPA that fits in your pocket.",
    stats: [
      { label: "Financial Clarity", value: "+89%" },
      { label: "Data Leakage", value: "Zero" },
      { label: "Tax Prep Time", value: "-73%" }
    ],
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-orange-900/15 to-transparent"></div>
  },
  {
    icon: ElderlyIcon,
    title: "Elderly Care Companion",
    problem: "Seniors living solo need daily support and emergency alerts, but internet-reliant devices feel invasive and impersonal. They deserve warmth, not wires.",
    solution: "GURU is a friendly, offline caregiver. It reminds them of meds, guides exercises, and detects falls with sensors—alerting family if trouble strikes. Its conversational charm melts loneliness away.",
    stats: [
      { label: "Emergency Response", value: "+63%" },
      { label: "Medication Adherence", value: "+47%" },
      { label: "User Satisfaction", value: "97%" }
    ],
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-red-900/20 to-transparent"></div>
  },
  {
    icon: TranslatorIcon,
    title: "Real-Time Translator for Global Travelers",
    problem: "Travelers stumble over language barriers in remote corners with no Wi-Fi. Miscommunication turns adventure into aggravation.",
    solution: "GURU is a pocket translator. With a mic and camera, it decodes speech and signs offline via OmniParser, beaming translations to your phone. Lightweight and relentless, it's built for the road.",
    stats: [
      { label: "Languages Supported", value: "94+" },
      { label: "Translation Speed", value: "Real-time" },
      { label: "Offline Accuracy", value: "97.8%" }
    ],
    className: "lg:col-span-1", 
    background: <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 to-transparent"></div>
  }
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
            Real Problems, Real Solutions
          </h2>
          <p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            GURU tackles critical challenges across industries with privacy-first AI that works entirely offline—where other solutions simply can't.
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
          <BentoGrid className="lg:grid-rows-3"> 
            {caseStudies.map((study, i) => (
              <motion.div
                 key={study.title}
                 variants={{ hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                 className={cn(
                     "relative rounded-xl overflow-hidden",
                     study.className
                 )}
              >
                {/* Background Element */} 
                {study.background || <div className="absolute inset-0 bg-white/5 group-hover/bento:bg-white/10 transition-colors duration-300"></div>}
                
                {/* BentoGridItem wrapper for content and positioning */}
                <div className="relative z-10 h-full"> 
                  <BentoGridItem
                    header={<div className="p-3 rounded-lg bg-black/10 shadow-inner flex items-center justify-center w-fit">{study.icon}</div>}
                    title={study.title} 
                    description={`${study.problem} ${study.solution}`}
                    className={cn(
                        "group/bento hover:shadow-xl transition-shadow duration-300", 
                        "flex flex-col justify-between p-5 md:p-6 h-full"
                    )} 
                    children={
                      <>
                        <div className="space-y-3 mb-4">
                          <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Problem</h3>
                            <p className="text-gray-300 text-sm">{study.problem}</p>
                          </div>
                          <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Solution</h3>
                            <p className="text-gray-300 text-sm">{study.solution}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10">
                          {study.stats.map((stat, j) => (
                            <div key={j} className="bg-white/5 rounded-lg px-3 py-2 text-center">
                              <div className="text-sm font-bold text-cyan-400">{stat.value}</div>
                              <div className="text-xs text-gray-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    }
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