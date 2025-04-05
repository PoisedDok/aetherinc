"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { ShineBorder } from '@/components/magicui/shine-border';
import { TiltCard } from '@/components/magicui/tilt-card';
import { BentoGrid, BentoGridItem } from '@/components/magicui/bento-grid';

// Icons
import { Bot, BrainCircuit, ShieldCheck, Gauge, Database, Layers, Palette, Server } from 'lucide-react';

// Feature type
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  className: string; 
  background?: React.ReactNode;
}

// Explicitly define icons as ReactNode before the array
const BotIcon = <Bot className="h-6 w-6 text-purple-400" />;
const BrainCircuitIcon = <BrainCircuit className="h-6 w-6 text-cyan-400" />;
const ShieldCheckIcon = <ShieldCheck className="h-6 w-6 text-green-400" />;
const GaugeIcon = <Gauge className="h-6 w-6 text-red-400" />;
const DatabaseIcon = <Database className="h-6 w-6 text-yellow-400" />;
const LayersIcon = <Layers className="h-6 w-6 text-blue-400" />;
const ServerIcon = <Server className="h-6 w-6 text-orange-400" />;
const PaletteIcon = <Palette className="h-6 w-6 text-pink-400" />;

// Assign the ReactNode variables to the icon property
const features: Feature[] = [
  {
    icon: BotIcon,
    title: "Truly Private AI Core",
    description: "Think Jarvis, but private. GURU processes everything on-device. Your data, thoughts, and conversations stay yours, always.",
    className: "lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-black opacity-50 group-hover:opacity-70 transition-opacity"></div>
  },
  {
    icon: BrainCircuitIcon,
    title: "67 TOPS Neural Engine",
    description: "Blazing-fast AI powered by NVIDIA Orin Jetson Super. Handles complex tasks locally with ease.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-cyan-900/20 to-transparent"></div>
  },
  {
    icon: ShieldCheckIcon,
    title: "Hardware Secure Enclave",
    description: "Fort Knox for your data. Dedicated hardware security isolates and protects your sensitive information.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-green-900/20 to-transparent"></div>
  },
  {
    icon: GaugeIcon,
    title: "Millisecond Latency",
    description: "Instantaneous responses. No cloud lag, just fluid interaction, like a natural conversation.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-red-900/20 to-transparent"></div>
  },
  {
    icon: DatabaseIcon,
    title: "On-Device Knowledge",
    description: "GURU learns *locally*. It adapts to you without sending your behaviour patterns to the cloud.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-yellow-900/15 to-transparent"></div>
  },
  {
    icon: LayersIcon,
    title: "Modular & Expandable",
    description: "Add cameras, sensors, or custom modules. GURU adapts to your specific needs.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent"></div>
  },
  {
    icon: ServerIcon,
    title: "Optional Secure Sync",
    description: "Choose to sync data across *your* devices with end-to-end encryption. You control the keys.",
    className: "lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-radial from-orange-900/15 to-transparent"></div>
  },
   {
    icon: PaletteIcon,
    title: "Open & Customizable",
    description: "Built with developers in mind. Integrate GURU into your own projects with our open SDK.",
    className: "lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-black opacity-50 group-hover:opacity-70 transition-opacity"></div>
  },
  
];

// Feature section props type
interface FeaturesProps {
  featuresRef: React.RefObject<HTMLElement | null>;
}

export default function Features({ featuresRef }: FeaturesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveredMap, setIsHoveredMap] = useState<{[key: number]: boolean}>({});
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  return (
    <section 
      ref={featuresRef}
      id="features" 
      className="relative bg-black py-24 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 z-0">
        <RetroGrid 
          className="h-full w-full"
          cellSize={60}
          opacity={0.6}
          angle={10}
          lightLineColor="rgba(255, 255, 255, 0.07)"
          darkLineColor="rgba(255, 255, 255, 0.05)"
        />
      </div>
    
      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        {/* Interactive pattern in background */}
        <div className="absolute inset-0 h-full w-full pointer-events-none">
          <InteractiveGridPattern 
            className="h-full w-full"
            dotColor="rgba(255, 255, 255, 0.1)"
            size={20}
          />
        </div>

        <motion.div 
          style={{ opacity, y }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="heading-2 font-bold mb-6 relative inline-block text-white"
          >
            Cutting-edge Features
            <motion.div 
              className="absolute -bottom-2 left-0 right-0 mx-auto w-40 h-1 bg-white"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="body-text text-gray-300 max-w-3xl mx-auto"
          >
            aetherinc combines powerful hardware with privacy-first design to deliver an AI experience that respects your data sovereignty while providing cutting-edge capabilities.
          </motion.p>
        </motion.div>

        <BentoGrid className="lg:grid-rows-3 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
               key={i} 
               variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
               className={cn("relative rounded-lg overflow-hidden", feature.className)} 
            >
              {feature.background || <div className="absolute inset-0 bg-white/5 group-hover/bento:bg-white/10 transition-colors"></div>}
              
              <div className="relative z-10 h-full"> 
                <BentoGridItem
                  header={<div className="p-2 rounded-md bg-black/10 flex items-center justify-center">{feature.icon}</div>}
                  title={feature.title}
                  description={feature.description}
                  className={cn("group/bento hover:shadow-xl transition-shadow duration-200 h-full")} 
                />
              </div>
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
} 