"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { BentoGrid, BentoGridItem } from "@/components/magicui/bento-grid"; 
import { Bot, BrainCircuit, ShieldCheck, Gauge, Database, Layers, Palette, Server, Link as LinkIcon } from 'lucide-react';

// Feature type
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  className: string; 
  background?: React.ReactNode;
}

// Define icons as ReactNode
const BotIcon = <Bot className="h-6 w-6 text-purple-400" />;
const BrainCircuitIcon = <BrainCircuit className="h-6 w-6 text-cyan-400" />;
const ShieldCheckIcon = <ShieldCheck className="h-6 w-6 text-green-400" />;
const GaugeIcon = <Gauge className="h-6 w-6 text-red-400" />;
const DatabaseIcon = <Database className="h-6 w-6 text-yellow-400" />;
const LayersIcon = <Layers className="h-6 w-6 text-blue-400" />;
const ServerIcon = <Server className="h-6 w-6 text-orange-400" />;
const LinkIconNode = <LinkIcon className="h-6 w-6 text-indigo-400" />; // Use different name due to Link import conflict
const PaletteIcon = <Palette className="h-6 w-6 text-pink-400" />;

// Features array for Bento Grid layout
const features: Feature[] = [
  {
    icon: BotIcon,
    title: "Truly Private AI Core",
    description: "Eliminate cloud AI risks. GURU runs advanced AI models entirely offline, ensuring your proprietary data and interactions remain confidential.",
    className: "lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-black opacity-50 group-hover/bento:opacity-70 transition-opacity"></div>
  },
  {
    icon: BrainCircuitIcon,
    title: "67 TOPS Neural Engine",
    description: "Execute demanding AI workflows—like real-time analysis or complex simulations—instantly on-device, bypassing cloud latency and costs.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-cyan-900/20 to-transparent"></div>
  },
  {
    icon: ShieldCheckIcon,
    title: "Hardware Secure Enclave",
    description: "Military-grade security anchors your AI. Isolate sensitive processing and data from potential software threats.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-green-900/20 to-transparent"></div>
  },
  {
    icon: GaugeIcon,
    title: "Millisecond Latency",
    description: "Unlock fluid, real-time AI interaction. GURU responds instantly, crucial for seamless workflows impossible with cloud delays.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-red-900/20 to-transparent"></div>
  },
  {
    icon: DatabaseIcon,
    title: "On-Device Knowledge",
    description: "Build a powerful, personalized knowledge graph that adapts *to you*, not a generic cloud profile. True context, locally mastered.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-yellow-900/15 to-transparent"></div>
  },
  {
    icon: LayersIcon,
    title: "Modular & Expandable",
    description: "Tailor GURU to specific industry needs. Easily integrate specialized sensors or hardware for unique edge AI applications.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent"></div>
  },
  {
    icon: ServerIcon,
    title: "Optional Secure Sync",
    description: "Maintain data sovereignty even when syncing. Securely bridge *your* devices with end-to-end encryption you control.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-orange-900/15 to-transparent"></div>
  },
  {
    icon: LinkIconNode, // Use renamed icon variable
    title: "Unified Device Control",
    description: "Streamline complex digital environments. Securely command and orchestrate computers, IoT devices, and systems through one private interface.",
    className: "lg:col-span-1", 
    background: <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 to-transparent"></div>
  },
   {
    icon: PaletteIcon,
    title: "Open & Customizable",
    description: "Accelerate innovation. Leverage our SDK to integrate GURU's private AI capabilities into your unique products and services.",
    className: "lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-black opacity-50 group-hover/bento:opacity-70 transition-opacity"></div>
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
       {/* You could add another layer like ParticleBackground here if desired */}
    
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
            Unlock True AI Potential, Privately
          </h2>
          <p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            GURU tackles complex AI challenges locally, surpassing cloud limitations in security, speed, and cost-efficiency. Discover the key advantages.
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
          <BentoGrid className="lg:grid-rows-3"> {/* Removed max-w-6xl from here */} 
            {features.map((feature, i) => (
              // Apply motion to the div containing background and item
              <motion.div
                 key={feature.title} // Use title for key if unique
                 variants={{ hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                 className={cn(
                     "relative rounded-xl overflow-hidden", // Apply base styling here
                     feature.className
                 )}
              >
                {/* Background Element */} 
                {feature.background || <div className="absolute inset-0 bg-white/5 group-hover/bento:bg-white/10 transition-colors duration-300"></div>}
                
                {/* BentoGridItem wrapper for content and positioning */}
                <div className="relative z-10 h-full"> 
                  <BentoGridItem
                    header={<div className="p-3 rounded-lg bg-black/10 shadow-inner flex items-center justify-center w-fit">{feature.icon}</div>} // Adjusted padding/styling
                    title={feature.title} 
                    description={feature.description}
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