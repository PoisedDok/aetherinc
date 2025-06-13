"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrainCircuit, MapPin, Award, Users, ExternalLink, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function FounderStory() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const storySteps = [
    {
      year: "2022",
      title: "From Jamtara to Glasgow",
      description: "Krish leaves his remote hometown in Jharkhand, India, to pursue Electronics & Software Engineering at the University of Glasgow",
      icon: <MapPin className="h-6 w-6" />,
      location: "Glasgow, Scotland"
    },
    {
      year: "Dec 2024",
      title: "Iron Man Changes Everything",
      description: "Watching Iron Man, Krish realizes: 'Why not build Jarvis? It's possible with AI now!' The GURU concept is born.",
      icon: <BrainCircuit className="h-6 w-6" />,
      location: "Glasgow"
    },
    {
      year: "2025",
      title: "Business Bloom Success", 
      description: "Applies to Glasgow University's Business Bloom startup program with GURU concept. Selected from 50+ ideas, receives £1,000 grant.",
      icon: <Award className="h-6 w-6" />,
      location: "University of Glasgow"
    },
    {
      year: "2025",
      title: "Adrian Joins the Vision",
      description: "Through his flatmate/landlord's recommendation, Krish connects with Adrian Wong - experienced founder and developer. Adrian joins as CTO & Co-founder.",
      icon: <Users className="h-6 w-6" />,
      location: "Glasgow"
    },
    {
      year: "June 10, 2025",
      title: "AetherInc Limited Born",
      description: "Company officially registered in Scotland (SC851680). From Iron Man dreams to registered business reality.",
      icon: <BrainCircuit className="h-6 w-6" />,
      location: "Scotland, UK"
    }
  ];

  const founders = [
    {
      name: "Krish Dokania",
      role: "CEO & Founder",
      title: "3rd Year UG Electronics and Software Eng || Software Engineer @GUSS || Founder @AetherInc",
      background: "From Jamtara, Jharkhand to Glasgow University",
      journey: "A small-town dreamer who turned Iron Man inspiration into a real AI company. Head of Research & Development at Glasgow University FinTech Society.",
      linkedin: "https://linkedin.com/in/krish-dokania-56203b217",
      image: "/founders/krish-dokania.jpg",
      achievements: [
        "£1,000 Business Bloom Grant Winner",
        "Selected from 50+ startup applications", 
        "Head of R&D, Glasgow FinTech Society",
        "Software Engineer at GUSS"
      ]
    },
    {
      name: "Adrian Wong",
      role: "CTO & Co-founder",
      title: "Experienced founder & full-stack developer",
      background: "University of Glasgow Computer Science graduate",
      journey: "Serial entrepreneur with expertise in FinTech, algorithmic trading, and full-stack development. Multiple startup exits and award-winning track record.",
      linkedin: "https://linkedin.com/in/acpwong",
      website: "https://adriancpwong.com",
      image: "/founders/adrian-wong.jpg",
      achievements: [
        "Founded Enular (Financial Technology)",
        "Multiple entrepreneurship awards",
        "Full-stack developer & CTO experience",
        "University of Glasgow Computer Science"
      ]
    }
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
                    <span className="text-gray-300 font-bold text-lg">{step.year}</span>
                    <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                      {step.location}
                    </Badge>
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
            {founders.map((founder, index) => (
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
                      <p className="text-gray-400 text-sm">{founder.background}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {founder.journey}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h5 className="text-white font-semibold mb-3">Key Achievements</h5>
                    <div className="space-y-2">
                      {founder.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-gray-400/30 text-gray-300 hover:bg-gray-400/10"
                    >
                      <Link href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Link>
                    </Button>
                    {founder.website && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-gray-500/30 text-gray-400 hover:bg-gray-500/10"
                      >
                        <Link href={founder.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Website
                        </Link>
                      </Button>
                    )}
                  </div>
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