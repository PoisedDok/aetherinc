"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShineBorder } from '@/components/magicui/shine-border';
import { Shield, Heart, Globe, Users, Lightbulb, Target } from 'lucide-react';

export default function CompanyVision() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const visionPoints = [
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: "Privacy First",
      description: "We believe your data belongs to you. Every AI process runs locally on your device, so your information never leaves your control.",
      gradient: "from-blue-500/10 to-cyan-500/5"
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-400" />,
      title: "Human-Centered AI",
      description: "Technology should serve you, not the other way around. Our AI enhances your capabilities while keeping you in full control of your data and decisions.",
      gradient: "from-purple-500/10 to-pink-500/5"
    },
    {
      icon: <Globe className="h-8 w-8 text-green-400" />,
      title: "Universal Access",
      description: "Everyone deserves powerful AI that's truly personal. AetherArena brings advanced AI capabilities to your device without compromise or subscription fees.",
      gradient: "from-green-500/10 to-emerald-500/5"
    }
  ];

  const values = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation",
      description: "Pushing boundaries of what's possible with local AI processing"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community",
      description: "Building technology that brings people together, not divides them"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Purpose",
      description: "Every line of code serves a meaningful purpose in improving lives"
    }
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background layers removed to allow Jarvis background to show through */}

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="relative inline-block mb-6">
            <ShineBorder 
              className="absolute inset-0 rounded-full" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
              duration={12}
            />
            <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-black/30">
              Our Vision
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Redefining AI for <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">Everyone</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We build friendly AI that works for humans—not the other way around. Everything runs on your own device, so your data never leaves your hands.
          </p>
        </motion.div>

        {/* Vision Points */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-24"
        >
          {visionPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={{ 
                hidden: { opacity: 0, y: 30 }, 
                visible: { opacity: 1, y: 0 } 
              }}
              className="relative group"
            >
              <ShineBorder 
                className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                duration={15 + index * 2}
              />
              <Card className="relative h-full p-8 bg-transparent border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-white/5 hover:bg-white/10 group-hover:scale-[1.02] min-h-[320px] flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 space-y-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-white/5">
                    <div className={`${
                      index === 0 ? "text-blue-400" : 
                      index === 1 ? "text-pink-400" : 
                      "text-green-400"
                    }`}>
                      {point.icon}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">{point.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-5xl mx-auto mb-20 relative"
        >
          <div className="relative">
            <ShineBorder 
              className="absolute inset-0 rounded-2xl opacity-70" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.5)"]}
              duration={20}
            />
            <Card className="relative p-8 md:p-12 bg-transparent border-white/10 backdrop-blur-sm">
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                  Born from Inspiration
                </h3>
                <div className="text-lg text-gray-300 leading-relaxed space-y-6">
                  <p>
                    AetherInc was born from a simple yet powerful realization: what if we could bring 
                    the AI assistant from science fiction into reality, but with one crucial difference - 
                    complete privacy and local processing?
                  </p>
                  <p>
                    Founded by a University of Glasgow student, our journey began with watching Iron Man 
                    and asking "Why not build Jarvis, but better?" From that moment, 
                    we've been dedicated to creating AI that truly serves its users.
                  </p>
                  <p>
                    Today, we're building the future where AI is not just intelligent, but also private, 
                    accessible, and genuinely helpful to everyone, not just corporations.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.8 }
            }
          }}
          className="text-center"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mb-12 relative inline-block"
          >
            <ShineBorder 
              className="absolute inset-0 rounded-full" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
              duration={12}
            />
            <h3 className="text-3xl md:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300 px-4">
              Our Core Values
            </h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={{ 
                  hidden: { opacity: 0, scale: 0.9 }, 
                  visible: { opacity: 1, scale: 1 } 
                }}
                className="relative group"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={10 + index * 3}
                />
                <Card className="relative h-full p-8 bg-transparent border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-white/5 hover:bg-white/10 group-hover:scale-[1.02] min-h-[250px] flex flex-col items-center justify-center">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center">
                      <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-white/5`}>
                        <div className={`${
                          index === 0 ? "text-yellow-400" : 
                          index === 1 ? "text-blue-400" : 
                          "text-green-400"
                        }`}>
                          {value.icon}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h4 className="text-xl font-bold mb-2 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">{value.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 