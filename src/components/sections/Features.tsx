"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';
import { RetroGrid } from '@/components/magicui/retro-grid';

// Icons
import { Cpu, Shield, Zap, LucideIcon, Wifi, Fingerprint, PlusCircle } from 'lucide-react';

// Feature types
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
  highlight?: boolean;
}

// Features array
const features: Feature[] = [
  {
    icon: Cpu,
    title: "67 TOPS Neural Engine",
    description: "Dedicated NPU for lightning-fast AI inference on your local device.",
    delay: 0.1,
    highlight: true
  },
  {
    icon: Shield,
    title: "Secure Enclave",
    description: "Hardware-level security for all your personal data and interactions.",
    delay: 0.2
  },
  {
    icon: Zap,
    title: "Ultra-Low Latency",
    description: "AI responses in milliseconds without cloud round-trips.",
    delay: 0.3
  },
  {
    icon: Wifi,
    title: "Optional Cloud Sync",
    description: "Selectively sync your data across devices with end-to-end encryption.",
    delay: 0.4
  },
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description: "Multi-layer security with fingerprint and voice recognition.",
    delay: 0.5
  },
  {
    icon: PlusCircle,
    title: "Expandable Functionality",
    description: "Extend capabilities with privacy-first plugins and integrations.",
    delay: 0.6
  }
];

// Feature section props type
interface FeaturesProps {
  featuresRef: React.RefObject<HTMLElement | null>;
}

export default function Features({ featuresRef }: FeaturesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
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
            className="text-4xl md:text-5xl font-bold mb-6 relative inline-block text-white"
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
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            GURU combines powerful hardware with privacy-first design to deliver an AI experience that respects your data sovereignty while providing cutting-edge capabilities.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <Card className={cn(
                "h-full backdrop-blur-sm border-white/10 transition-all duration-300 hover:border-white/20",
                feature.highlight 
                  ? "bg-gradient-to-br from-white/10 to-white/5" 
                  : "bg-white/5"
              )}>
                <CardHeader className="pb-2">
                  <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                </CardContent>
                
                {feature.highlight && (
                  <div className="absolute inset-0 rounded-lg">
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                      <div className="absolute -inset-[100%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" />
                    </div>
                    <div className="absolute inset-[1px] rounded-lg bg-black" />
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 