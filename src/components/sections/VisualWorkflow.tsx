"use client";

import React, { forwardRef, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, AudioLines, FileCog, FileCheck, ArrowRight, ArrowDown, Code, ShieldAlert, BotMessageSquare, FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedBeam } from "@/components/magicui/animated-beam";

// Interfaces for AnimatedBeam props (simplified, adjust based on actual component)
interface CircleProps extends React.HTMLAttributes<HTMLDivElement> {}
const Circle = forwardRef<HTMLDivElement, CircleProps>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center rounded-full border-2 border-border bg-background p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = 'Circle';

// Workflow steps data
const meetingWorkflow = [
  { id: "m1", icon: Mic, label: "Record Meeting", description: "Initiate audio recording directly on GURU." },
  { id: "m2", icon: AudioLines, label: "Local Speech-to-Text", description: "Audio is transcribed into text entirely on the device." },
  { id: "m3", icon: FileCog, label: "On-Device Summarization", description: "The local LLM processes the transcript to create a concise summary." },
  { id: "m4", icon: FileCheck, label: "Secure Summary Ready", description: "The private summary is instantly available only on your GURU." },
];

const codeWorkflow = [
   { id: "c1", icon: Code, label: "Input Code Snippet", description: "Paste or provide code directly to GURU." },
   { id: "c2", icon: FlaskConical, label: "Local Analysis Engine", description: "On-device models scan for vulnerabilities & style issues." },
   { id: "c3", icon: ShieldAlert, label: "Identify Potential Issues", description: "GURU highlights security risks or suggests improvements." },
   { id: "c4", icon: BotMessageSquare, label: "Review Securely", description: "Get feedback without exposing proprietary code externally." },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Time between each child animation
      delayChildren: 0.2,   // Initial delay before first child starts
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

const arrowVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1, 
    transition: { duration: 0.6, ease: "easeInOut" } 
  },
};

// Helper component for rendering a single workflow row with AnimatedBeam
const WorkflowRow = ({ workflow, isInView, title }: { workflow: Array<{ id: string; icon: React.ElementType; label: string; description: string }>, isInView: boolean, title: string }) => {
  // Create refs for each step dynamically
  const refs = workflow.reduce((acc, step) => {
    acc[step.id] = React.createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
    return acc;
  }, {} as Record<string, React.RefObject<HTMLDivElement>>);

  // Determine gradient based on workflow title (example logic)
  const gradientClass = title.toLowerCase().includes("meeting") 
    ? "from-cyan-600 to-blue-600"
    : "from-purple-600 to-indigo-600";

  return (
    <div className="mb-16 last:mb-0">
        <h3 className="text-xl md:text-2xl font-semibold text-center text-white mb-10">{title}</h3>
        <div className="relative flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-10 lg:gap-12">
          {/* Map over steps to render cards */} 
          {workflow.map((step, index) => (
             <motion.div 
                key={step.id}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.2 }} // Stagger items
                ref={refs[step.id]} // Assign ref here
                className="flex flex-col items-center text-center p-5 bg-white/5 border border-white/10 rounded-xl shadow-lg w-full md:w-auto md:flex-1 z-10" // Ensure cards are above beam
            >
                <div className={`mb-3 p-3 rounded-lg bg-gradient-to-br ${gradientClass} shadow-inner w-fit`}>
                <step.icon size={24} className="text-white" />
                </div>
                <h4 className="text-base font-semibold mb-1 text-white">{step.label}</h4>
                <p className="text-xs text-gray-400 flex-grow">{step.description}</p> 
            </motion.div>
          ))}

          {/* Render AnimatedBeams between steps - Conditionally */}
          {isInView && workflow.map((step, index) => {
            if (index < workflow.length - 1) {
              const nextStepId = workflow[index + 1].id;
              // Check if refs exist before rendering the beam
              if (refs[step.id]?.current && refs[nextStepId]?.current) {
                return (
                  <AnimatedBeam
                    key={`${step.id}-to-${nextStepId}`}
                    containerRef={useRef<HTMLDivElement>(null)} 
                    // Use type assertion to satisfy AnimatedBeam's strict typing
                    fromRef={refs[step.id] as React.RefObject<HTMLDivElement>}
                    toRef={refs[nextStepId] as React.RefObject<HTMLDivElement>}   
                    duration={2 + index * 0.5} 
                    delay={1.0 + index * 0.4} 
                    pathColor="rgba(100, 100, 100, 0.3)"
                  />
                );
              }
            }
            return null;
          })}
        </div>
    </div>
  );
};

// Main component
export default function VisualWorkflow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
       {/* Optional: Add subtle background pattern */}
       <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
         {/* Example: <GridPattern width={60} height={60} x={-1} y={-1} /> */}
       </div>
       
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            How GURU Operates (Privately)
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            Unlike cloud AI, GURU processes tasks locally. Here's a glimpse into how common workflows remain entirely on your device.
          </p>
        </motion.div>

        <WorkflowRow workflow={meetingWorkflow} isInView={isInView} title="Example: Private Meeting Summarization" />
        <WorkflowRow workflow={codeWorkflow} isInView={isInView} title="Example: Secure Code Review" />

      </div>
    </section>
  );
} 