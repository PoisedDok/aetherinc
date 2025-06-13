"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Linkedin, 
  ExternalLink, 
  MapPin, 
  GraduationCap, 
  Building, 
  Code, 
  Award,
  Rocket,
  Users
} from 'lucide-react';

interface AboutProps {
  aboutRef: React.RefObject<HTMLElement | null>;
}

export default function About({ aboutRef }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const founderData = [
    {
      name: "Krish Dokania",
      title: "CEO & Founder",
      location: "Originally from Jamtara, Jharkhand, India",
      university: "University of Glasgow - Electronics & Software Engineering",
      description: "Visionary entrepreneur who turned Iron Man inspiration into reality. Currently in his 3rd year at Glasgow University, Krish combines technical expertise with business acumen to lead AetherInc's mission of democratizing AI access.",
      achievements: [
        "Founded AetherInc at age 21",
        "Selected for Business Bloom program (10/50+ applicants)",
        "Software Engineer at Glasgow University Software Service (GUSS)",
        "Secured £1,000 startup grant",
        "Journey from remote Jamtara to Scottish entrepreneur"
      ],
      skills: [
        "Software Engineering",
        "Electronics",
        "Business Development", 
        "AI/ML Concepts",
        "Startup Leadership",
        "Product Vision"
      ],
      linkedin: "https://linkedin.com/in/krish-dokania-56203b217/",
      image: "/krish-profile.jpg", // Placeholder
      quote: "From watching Iron Man to building our own Jarvis - sometimes the biggest dreams start with the simplest inspirations."
    },
    {
      name: "Adrian Wong",
      title: "CTO & Co-Founder", 
      location: "New Zealand citizen with right to work in UK",
      university: "University of Glasgow - BSc Computing Science (Data Science)",
      description: "Serial entrepreneur and technical virtuoso with 6+ years of startup experience. Adrian brings deep expertise in AI, machine learning, and full-stack development to AetherInc's technical foundation.",
      achievements: [
        "Graduate in Computing Science with Data Science specialization",
        "Founded multiple successful startups (Enular, Seme, Legal Pythia)",
        "8,800+ downloads of open-source Python backtesting library",
        "Winner of Ford College Community Challenge",
        "Runner-up in Barclays Entrepreneurship Awards",
        "Expertise in algorithmic trading and financial technology"
      ],
      skills: [
        "Python (Expert)",
        "Machine Learning & AI",
        "Full-Stack Development", 
        "Django/Flask",
        "React/React Native",
        "AWS & Cloud Infrastructure",
        "Algorithmic Trading",
        "Product Management"
      ],
      linkedin: "https://linkedin.com/in/acpwong/",
      portfolio: "https://adriancpwong.com",
      image: "/adrian-profile.jpg", // Placeholder
      quote: "Building AetherInc combines my passion for AI innovation with the mission to create truly private, accessible artificial intelligence for everyone."
    }
  ];

  return (
    <section 
      ref={aboutRef}
      className="relative bg-gradient-to-b from-black via-gray-950 to-black py-24 md:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `conic-gradient(from 0deg at 50% 50%, rgba(59, 130, 246, 0.3) 0deg, rgba(147, 51, 234, 0.3) 120deg, rgba(236, 72, 153, 0.3) 240deg, rgba(59, 130, 246, 0.3) 360deg)`,
          backgroundSize: '400px 400px'
        }} />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-black/30 mb-6">
            Meet the Visionaries
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
            The Minds Behind AetherInc
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Two brilliant minds from Glasgow University, united by a shared vision to make AI accessible, private, and revolutionary
          </p>
        </motion.div>

        {/* Founder Profiles */}
        <div className="max-w-7xl mx-auto space-y-16">
          {founderData.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Profile Image & Quick Info */}
              <div className="lg:w-1/3">
                <Card className="p-6 bg-black/40 border-white/10 backdrop-blur-sm">
                  <div className="relative mb-6">
                    <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 p-1">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        {/* Placeholder for profile image */}
                        <span className="text-4xl font-bold text-white">
                          {founder.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{founder.name}</h3>
                    <p className="text-cyan-400 font-semibold mb-4">{founder.title}</p>
                    
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{founder.location}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <GraduationCap className="h-4 w-4 text-gray-400" />
                        <span>{founder.university}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                    >
                      <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    {founder.portfolio && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-white/30 text-white/90 hover:bg-white/10"
                      >
                        <a href={founder.portfolio} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Portfolio
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>
              </div>

              {/* Detailed Information */}
              <div className="lg:w-2/3 space-y-8">
                {/* Quote */}
                <Card className="p-6 bg-gradient-to-r from-gray-600/10 to-gray-800/10 border-white/10">
                  <div className="text-lg italic text-gray-200 leading-relaxed">
                    "{founder.quote}"
                  </div>
                </Card>

                {/* Description */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                    <Users className="h-5 w-5 text-cyan-400" />
                    About {founder.name.split(' ')[0]}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {founder.description}
                  </p>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    Key Achievements
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {founder.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Rocket className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-400" />
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {founder.skills.map((skill, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="text-gray-300 border-gray-600 hover:border-cyan-400/50"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Registration Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 bg-black/40 border-white/10 backdrop-blur-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building className="h-6 w-6 text-cyan-400" />
              <h3 className="text-2xl font-bold">Officially Registered</h3>
            </div>
            <p className="text-gray-300 mb-4">
              AetherInc Limited is officially registered in Scotland, ensuring full legal compliance and legitimacy for our AI innovation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="outline" className="text-cyan-400 border-cyan-400/30">
                Company SC851680
              </Badge>
              <Badge variant="outline" className="text-white/90 border-white/20">
                Registered: June 10, 2025
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400/30">
                Glasgow, Scotland
              </Badge>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-gray-600 text-gray-300 hover:border-cyan-400/50"
              >
                <a 
                  href="https://find-and-update.company-information.service.gov.uk/company/SC851680" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Company Registration
                </a>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
} 