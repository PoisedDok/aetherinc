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
    title: "Personal AI Workspace Assistant",
    description: "Your local AI companion that's always ready.",
    problem: "Traditional AI assistants send your data to the cloud, risking privacy and requiring constant internet. When servers go down, your productivity stops.",
    solution: "AetherArena operates entirely on your device. The floating terminal interface gives you AI assistance for coding, research, and content creation—all without sending your data anywhere.",
    className: "lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-black opacity-50 group-hover/bento:opacity-70 transition-opacity"></div>
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Healthcare Assistant",
    description: "Privacy-first medical aide.",
    problem: "Healthcare professionals need AI help with patient data, but cloud solutions risk exposing sensitive information and violating HIPAA regulations.",
    solution: "With AetherArena, doctors can process patient records, analyze medical images, and draft documents—all locally. Data never leaves the hospital network, ensuring total privacy compliance.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-green-900/20 to-transparent"></div>
  },
  {
    icon: GaugeIcon,
    title: "Developer's Command Center",
    description: "Code faster with full system control.",
    problem: "Developers lose time switching between tools, writing boilerplate code, and managing system tasks across multiple terminals and interfaces.",
    solution: "AetherArena's terminal interface integrates with your development environment, providing code completion, project scaffolding, automated testing, and full system command capabilities—all through natural conversation.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-red-900/20 to-transparent"></div>
  },
  {
    icon: BookOpenIcon,
    title: "Offline Research Assistant",
    description: "Knowledge access anywhere.",
    problem: "Researchers and students need AI to process and analyze large volumes of information, but can't always rely on internet access or cloud-based tools.",
    solution: "With locally installed knowledge bases, AetherArena helps analyze documents, generate literature reviews, and create research summaries—even in remote fieldwork situations with no internet.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent"></div>
  },
  {
    icon: BriefcaseIcon,
    title: "Custom AI Module Platform",
    description: "Expand capabilities as needed.",
    problem: "Standard AI tools force you into a one-size-fits-all solution that either has too many features you don't need or lacks critical functionality.",
    solution: "AetherArena's modular architecture lets you install only the AI services you need—from document processing to data analysis to creative tools—like apps on your phone, customized for your specific requirements.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-cyan-900/20 to-transparent"></div>
  },
  {
    icon: WalletIcon,
    title: "Financial Planning System",
    description: "Your private money advisor.",
    problem: "Financial tools with AI capabilities collect sensitive financial data and often have subscription fees that add up over time.",
    solution: "AetherArena processes all your financial information locally. Use voice commands to track expenses, forecast budgets, or plan investments—with total privacy and no recurring costs.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-pink-900/20 to-transparent"></div>
  },
  {
    icon: UsersIcon,
    title: "Team Productivity Hub",
    description: "Enterprise efficiency without compromise.",
    problem: "Companies want AI tools that boost productivity but worry about sensitive data being processed on external servers outside their control.",
    solution: "Deploy AetherArena on your company server for a team productivity solution that keeps all data in-house. Custom agents help each department while IT maintains complete control over the system.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 to-transparent"></div>
  },
  {
    icon: GlobeIcon,
    title: "Universal Terminal Interface",
    description: "Control everything through conversation.",
    problem: "Managing your digital life means juggling dozens of apps, each with different interfaces and workflows, creating constant context-switching and friction.",
    solution: "AetherArena's terminal provides a unified interface to control your entire digital environment. Launch apps, process files, write code, and automate tasks—all through a single conversational interface.",
    className: "lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-black opacity-50 group-hover/bento:opacity-70 transition-opacity"></div>
  },
];

// Feature section props type
interface FeaturesProps {
  featuresRef: React.RefObject<HTMLElement>;
}

export default function Features({ featuresRef }: FeaturesProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 }); // Trigger animation earlier
  
  return (
    <section 
      ref={featuresRef as React.RefObject<HTMLElement>}
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
            Why AetherArena is Revolutionary
          </h2>
          <p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            An AI architecture that runs locally on your hardware, giving you full device control through a simple conversational interface, all while keeping your data completely private.
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