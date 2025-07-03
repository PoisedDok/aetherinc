"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShineBorder } from '@/components/magicui/shine-border';
import { Linkedin, ExternalLink, MapPin, GraduationCap, Sparkles } from 'lucide-react';

export default function AboutFounders() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const founders = [
    {
      name: "Krish Dokania",
      title: "Founder & CEO",
      role: "Founder & CEO",
      bio: "A visionary entrepreneur passionate about making AI accessible and useful for everyone. Krish founded AetherInc with the mission to create AI tools that truly understand and serve human needs without compromising on privacy.",
      image: "/Aether.jpeg",
      location: "Glasgow, Scotland",
      education: "University of Glasgow - Electronics & Software Engineering",
      story: "From a small town in Jharkhand, India to founding AetherInc in Scotland. Krish's journey embodies the power of dreams and determination in building the future of AI.",
      quote: "Sometimes the biggest dreams start with the simplest inspirations - like watching Iron Man for the fifth time.",
      linkedin: "https://linkedin.com/in/krish-dokania-56203b217/",
      website: "",
      highlights: [
        "Selected for Business Bloom startup program",
        "Software Engineer at Glasgow University",
        "Secured startup funding"
      ],
      gradientColor: "from-gray-500/10 to-gray-600/5"
    }
  ];

  return (
    <section className="relative bg-transparent py-24 md:py-32 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        {/* Additional pattern */}
        <div className="absolute inset-0 z-[1] opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>
      </div>

      {/* Gradient overlay removed to allow Jarvis background to show through */}

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
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
              duration={10}
            />
            <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-black/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Meet the Founder
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            The Mind Behind <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">AetherInc</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A brilliant mind from the University of Glasgow, with a vision 
            to make AI accessible, private, and revolutionary.
          </p>
        </motion.div>

        {/* Founders */}
        <div className="max-w-7xl mx-auto space-y-20">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
            >
              {/* Profile Card */}
              <div className="lg:w-1/3">
                <div className="relative">
                  <ShineBorder 
                    className="absolute inset-0 rounded-2xl opacity-70" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.5)"]}
                    duration={12 + index * 2}
                  />
                  <Card className={`relative p-8 bg-gradient-to-br ${founder.gradientColor} backdrop-blur-sm border-white/10`}>
                    {/* Profile Avatar */}
                    <div className="mb-6">
                      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-white/20 via-white/10 to-white/5 p-1">
                        <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-2xl font-bold text-white">
                            {founder.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Basic Info */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-1 text-white">{founder.name}</h3>
                      <p className="text-white/80 font-semibold mb-4">{founder.role}</p>
                      
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex items-center justify-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{founder.location}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <GraduationCap className="h-4 w-4 text-gray-400" />
                          <span className="text-center">{founder.education}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      <div className="relative">
                        <ShineBorder 
                          className="absolute inset-0 rounded-lg" 
                          borderWidth={1}
                          shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
                          duration={8}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="relative border-white/20 text-white/90 hover:bg-white/10 bg-black/20 backdrop-blur-sm"
                        >
                          <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                          </a>
                        </Button>
                      </div>
                      
                      {founder.website && (
                        <div className="relative">
                          <ShineBorder 
                            className="absolute inset-0 rounded-lg" 
                            borderWidth={1}
                            shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
                            duration={10}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="relative border-white/20 text-white/90 hover:bg-white/10 bg-black/20 backdrop-blur-sm"
                          >
                            <a href={founder.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Website
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>

              {/* Story & Details */}
              <div className="lg:w-2/3 space-y-6">
                {/* Quote */}
                <div className="relative">
                  <ShineBorder 
                    className="absolute inset-0 rounded-xl opacity-60" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                    duration={14}
                  />
                  <Card className="relative p-6 bg-black/50 border-white/10 backdrop-blur-sm">
                    <div className="text-lg italic text-gray-200 leading-relaxed">
                      "{founder.quote}"
                    </div>
                  </Card>
                </div>

                {/* Story */}
                <div className="relative">
                  <ShineBorder 
                    className="absolute inset-0 rounded-xl opacity-50" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
                    duration={16}
                  />
                  <Card className="relative p-6 bg-black/40 border-white/10 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold mb-4 text-white">Background</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">{founder.story}</p>
                    
                    {/* Highlights */}
                    <div>
                      <h5 className="text-lg font-semibold mb-3 text-white">Key Achievements</h5>
                      <div className="space-y-2">
                        {founder.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-white/70" />
                            <span className="text-gray-300 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Registration Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20 pt-8 border-t border-white/10"
        >
          <div className="relative inline-block">
            <ShineBorder 
              className="absolute inset-0 rounded-lg opacity-40" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
              duration={20}
            />
            <div className="relative px-6 py-3 bg-black/30 border border-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-gray-400 text-sm font-medium">
                AetherInc Limited • Registered in Scotland • Company Number: SC851680
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Proudly built by Glasgow University students
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 