"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrainCircuit, MapPin, Award, Users, ExternalLink, Linkedin, Sparkle, Hammer, Rocket, Code, Coins, Globe } from 'lucide-react';
import Link from 'next/link';

export default function FounderStory() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const storySteps = [
    {
      title: "The Iron Man Inspiration",
      date: "October 2023",
      description: "Watching Iron Man, Krish was fascinated by Jarvis's capabilities. He couldn't stop wondering: What if AI could be this helpful in everyday life?",
      icon: <Sparkle className="h-5 w-5" />
    },
    {
      title: "The First Prototypes",
      date: "November 2023",
      description: "Working nights and weekends, Krish builds his first AI prototype systems to understand what's possible with current technology.",
      icon: <Hammer className="h-5 w-5" />
    },
    {
      title: "AetherInc Founded",
      date: "December 2023",
      description: "AetherInc Limited is officially incorporated in Scotland with a mission to build AI systems that transform how people interact with technology.",
      icon: <Rocket className="h-5 w-5" />
    },
    {
      title: "Product Development Begins",
      date: "January 2024",
      description: "Development of the GURU AI assistant begins, focusing on creating a truly helpful AI that runs locally for privacy and security.",
      icon: <Code className="h-5 w-5" />
    },
    {
      title: "First External Funding",
      date: "February 2024",
      description: "AetherInc secures its first external investment, providing resources to accelerate product development and expand the team.",
      icon: <Coins className="h-5 w-5" />
    },
    {
      title: "Going Public",
      date: "April 2024", 
      description: "Launch of the company website and the announcement of the GURU product to the public. Early waitlist sign-ups begin flowing in.",
      icon: <Globe className="h-5 w-5" />
    }
  ];

  const founderSpotlights = [
    {
      name: "Krish Dokania",
      role: "Founder & CEO",
      quote: "I wanted to create an AI that doesn't compromise on privacy or capability - something that could transform how we interact with technology while keeping our data secure.",
      image: "/Aether.jpeg" 
    }
    // Adrian Wong's entry removed
  ];

  return (
    <section className="relative bg-gradient-to-b from-black via-slate-950 to-black py-24 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <Badge variant="outline" className="text-gray-300 border-gray-500/30 px-4 py-2 text-sm font-semibold backdrop-blur-sm mb-6">
            Our Origin Story
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            From Iron Man Dreams to AI Reality
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            The journey from a small town in Jharkhand to building Scotland's most ambitious AI startup. 
            How watching Iron Man sparked a revolution in privacy-first AI.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white via-gray-400 to-white opacity-30" />
            
            {storySteps.map((step, index) => (
              <motion.div
                key={index}
                variants={{ 
                  hidden: { opacity: 0, x: -20 }, 
                  visible: { opacity: 1, x: 0 } 
                }}
                className="relative flex items-start gap-6 mb-8 last:mb-0"
              >
                {/* Timeline Node */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-600 shadow-lg shadow-gray-400/25">
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gray-300 font-bold text-lg">{step.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Founders Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.4 }
            }
          }}
          className="max-w-6xl mx-auto"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Meet the Founders
            </h3>
            <p className="text-gray-300 text-lg">
              Two visionaries united by a shared dream to democratize AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {founderSpotlights.map((founder, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-slate-900/80 to-black/60 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                  {/* Founder Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-600 flex items-center justify-center text-black font-bold text-xl">
                      {founder.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white">{founder.name}</h4>
                                              <p className="text-gray-300 font-medium">{founder.role}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {founder.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Registration Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-2xl mx-auto mt-16 text-center"
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h4 className="text-white font-semibold mb-3">Official Company Status</h4>
            <div className="space-y-2 text-gray-300">
              <p><strong>Legal Name:</strong> AetherInc Limited</p>
              <p><strong>Registration:</strong> SC851680 (Scotland)</p>
              <p><strong>Founded:</strong> June 10, 2025</p>
              <p><strong>Grant Received:</strong> £1,000 (Business Bloom Program)</p>
            </div>
            <Button
              variant="outline" 
              size="sm"
              asChild
              className="mt-4 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Link 
                href="https://find-and-update.company-information.service.gov.uk/company/SC851680" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Company Registration
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 