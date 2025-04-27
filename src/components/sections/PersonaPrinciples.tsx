"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserCheck, Sparkles, Lock, ShieldAlert, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

const principles = [
  {
    icon: Lock,
    title: "Absolute Privacy",
    description: "Your data never leaves your possession. All AI tasks process directly on your device for complete privacy and security."
  },
  {
    icon: Database,
    title: "Powerful Automation",
    description: "From browser automation to file management, GURU handles complex tasks through natural conversation, making workflows seamless."
  },
  {
    icon: ShieldAlert,
    title: "Complete Ownership",
    description: "No recurring costs or subscriptions. You own GURU completely, gaining a digital companion that's always ready to help."
  }
];

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PersonaPrinciples() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-black via-slate-900 to-black text-white overflow-hidden relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column: The Partner */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
               <UserCheck size={16} />
              Your Digital Partner
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
               More Than an Assistant, <br />Your AI Companion.
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              GURU is your revolutionary AI companion that helps you accomplish real-world tasks with ease. Through natural conversation, it becomes your digital partner for research, data analysis, and everyday challenges.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              With a powerful toolkit that includes browser automation, file management, and API integration, GURU solves your complex problems through simple conversations. It adapts to your needs, enhancing your productivity where you need support the most.
            </p>
            <div className="flex items-center gap-3 text-cyan-400">
               <Sparkles size={20} />
               <span className="font-medium">Experience the future of AI assistance.</span>
            </div>
          </motion.div>

          {/* Right Column: The Principles */}
          <motion.div 
            className="space-y-8"
             initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                 hidden: { opacity: 0 },
                 visible: { opacity: 1, transition: { staggerChildren: 0.2, delay: 0.3 } }
             }}
          >
            {principles.map((principle, index) => (
              <motion.div 
                key={index} 
                className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-lg shadow-md backdrop-blur-sm"
                variants={variants}
              >
                <div className={cn(
                    "mt-1 p-2 rounded-md w-fit h-fit",
                    index === 0 ? "bg-blue-500/20 text-blue-400" :
                    index === 1 ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  )}>
                   <principle.icon size={24} />
                 </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-white">{principle.title}</h3>
                  <p className="text-sm text-gray-400">{principle.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 