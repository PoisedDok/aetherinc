"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { ShineBorder } from '@/components/magicui/shine-border';
import { TiltCard } from '@/components/magicui/tilt-card';

// Icons
import { CircuitBoard, Shield, Zap, LucideIcon, Wifi, Fingerprint, PlusCircle, Languages, GraduationCap, Building2 } from 'lucide-react';

// Feature types
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  detail?: string;
  delay: number;
  highlight?: boolean;
}

// Features array
const features: Feature[] = [
  {
    icon: CircuitBoard,
    title: "67 TOPS Neural Engine",
    description: "NVIDIA Orin Jetson Super platform delivers lightning-fast AI inference on your local device.",
    detail: "Built on NVIDIA's cutting-edge architecture, our 67 TOPS NPU efficiently runs complex models like Llama and Mistral with minimal power consumption.",
    delay: 0.1,
    highlight: true
  },
  {
    icon: Shield,
    title: "Secure Enclave",
    description: "Hardware-level security ensures all your personal data and interactions remain private.",
    detail: "Advanced encryption and isolated processing guarantees your data never leaves your device without explicit permission.",
    delay: 0.2
  },
  {
    icon: Zap,
    title: "Ultra-Low Latency",
    description: "AI responses in milliseconds without cloud round-trips for smooth, real-time interactions.",
    detail: "Experience conversation-quality response times of under 100ms, eliminating the lag and disconnection issues common with cloud-based AI.",
    delay: 0.3
  },
  {
    icon: Wifi,
    title: "Optional Cloud Sync",
    description: "Selectively sync your data across devices with end-to-end encryption when you choose.",
    detail: "Control exactly what data gets synchronized, with granular permissions and automatic encryption to maintain privacy across your devices.",
    delay: 0.4
  },
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description: "Multi-layer security with fingerprint and voice recognition for personalized access.",
    detail: "Instantly recognize authorized users through multiple biometric factors, ensuring both security and a personalized AI experience.",
    delay: 0.5
  },
  {
    icon: PlusCircle,
    title: "Expandable Functionality",
    description: "Extend capabilities with cameras, sensors, and privacy-first plugins for custom solutions.",
    detail: "The modular hardware design allows for easy integration of additional sensors or specialized tools for your specific needs.",
    delay: 0.6
  },
  {
    icon: Languages,
    title: "Multilingual Assistant",
    description: "Real-time translation across languages with natural speech synthesis.",
    detail: "aetherinc's on-device processing enables fluent translation in over 40 languages without internet connectivity.",
    delay: 0.7
  },
  {
    icon: GraduationCap,
    title: "Personalized Learning",
    description: "Adaptive tutoring that evolves with your learning style and knowledge gaps.",
    detail: "Create personalized learning plans with interactive lessons, quizzes, and explanations tailored to your pace.",
    delay: 0.8
  },
  {
    icon: Building2,
    title: "Industry Solutions",
    description: "Specialized configurations for healthcare, manufacturing, education, and more.",
    detail: "Custom workflows and dedicated processing for industry-specific tasks, from healthcare documentation to manufacturing quality control.",
    delay: 0.9
  }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            index === 0 ? (
              // First feature box without animation
              <div key={index} className="h-full">
                <div className="relative group h-full">
                  <Card className={cn(
                    "h-full backdrop-blur-sm border-white/10 transition-all duration-300 hover:border-white/20 overflow-hidden relative",
                    feature.highlight 
                      ? "bg-transparent" 
                      : "bg-white/5"
                  )}>
                    <CardHeader className="pb-2 relative z-10">
                      <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-gray-200 mb-2">{feature.description}</CardDescription>
                      {feature.detail && (
                        <p className="text-sm text-gray-300 mt-2">
                          {feature.detail}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              // Remaining feature boxes with animation
              <TiltCard
                key={index}
                className="h-full"
                tiltMax={8}
                scale={1.02}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  viewport={{ once: true, margin: "-10%" }}
                  onMouseEnter={() => setIsHoveredMap(prev => ({...prev, [index]: true}))}
                  onMouseLeave={() => setIsHoveredMap(prev => ({...prev, [index]: false}))}
                  className="relative group h-full"
                >
                  <ShineBorder 
                    className={cn(
                      "absolute inset-0 rounded-lg transition-opacity duration-300",
                      isHoveredMap[index] || feature.highlight ? "opacity-100" : "opacity-0",
                    )}
                    borderWidth={1}
                    shineColor={feature.highlight ? 
                      ["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.6)"] : 
                      ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
                    duration={feature.highlight ? 10 : 14}
                  />
                  <Card className={cn(
                    "h-full backdrop-blur-sm border-white/10 transition-all duration-300 hover:border-white/20 overflow-hidden relative",
                    feature.highlight 
                      ? "bg-transparent" 
                      : "bg-white/5"
                  )}>
                    <CardHeader className="pb-2 relative z-10">
                      <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-gray-200 mb-2">{feature.description}</CardDescription>
                      {feature.detail && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: isHoveredMap[index] ? 1 : 0,
                            height: isHoveredMap[index] ? "auto" : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-sm text-gray-300 mt-2 overflow-hidden"
                        >
                          {feature.detail}
                        </motion.p>
                      )}
                    </CardContent>
                    
                    {feature.highlight && (
                      <div className="absolute inset-0 rounded-lg pointer-events-none">
                        <div className="absolute inset-0 overflow-hidden rounded-lg">
                          <div className="absolute -inset-[100%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" />
                        </div>
                        <div className="absolute inset-[1px] rounded-lg bg-gradient-to-br from-white/10 to-white/5" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              </TiltCard>
            )
          ))}
        </div>
      </div>
    </section>
  );
} 