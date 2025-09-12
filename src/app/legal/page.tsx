"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShineBorder } from '@/components/magicui/shine-border';
import { 
  Shield, 
  FileText, 
  Eye, 
  CheckSquare, 
  Scale, 
  Lock, 
  Database,
  ChevronRight,
  Gavel,
  Search,
  BookOpen,
  Calendar,
  Users,
  Target
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LegalPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const useCasesRef = useRef<HTMLDivElement | null>(null);
  const complianceRef = useRef<HTMLDivElement | null>(null);
  const pilotRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playCount, setPlayCount] = useState(0);
  const [isUserControlled, setIsUserControlled] = useState(false);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const useCasesInView = useInView(useCasesRef, { once: true, amount: 0.2 });
  const complianceInView = useInView(complianceRef, { once: true, amount: 0.2 });
  const pilotInView = useInView(pilotRef, { once: true, amount: 0.3 });

  // Auto-play video when in view (with limits)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isUserControlled && playCount < 3) {
            // Video is in view, try to play (limit to 3 auto-plays)
            video.play().catch(() => {
              // Autoplay failed (likely due to browser policies requiring user interaction), user can still click to play
              console.log('Autoplay prevented by browser, user can click to play');
            });
          } else if (!entry.isIntersecting) {
            // Video is out of view, pause it
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // 50% of video needs to be visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before video is fully out of view
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [playCount, isUserControlled]);

  // Track play count and user interactions
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      if (!isUserControlled) {
        setPlayCount(prev => prev + 1);
      }
    };

    const handleUserInteraction = () => {
      setIsUserControlled(true);
    };

    const handleEnded = () => {
      // After video ends, disable looping if it's been played multiple times
      if (playCount >= 2) {
        video.loop = false;
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('click', handleUserInteraction);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('click', handleUserInteraction);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isUserControlled, playCount]);

  // Handle video click to toggle play/pause
  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    setIsUserControlled(true);
  };

  const legalUseCases = [
    {
      icon: <FileText className="h-6 w-6 text-blue-400" />,
      title: "Contract Review & Analysis",
      description: "Find key terms, dates, obligations, and important clauses from contracts with high accuracy. Works with complex legal language, agreements between multiple parties, and scanned documents.",
      outcomes: ["High accuracy on standard contracts", "Finds 50+ key details automatically", "Works with handwritten notes"]
    },
    {
      icon: <Search className="h-6 w-6 text-green-400" />,
      title: "Document Discovery Review",
      description: "Process large volumes of documents, identify confidential content, extract relevant sections, and highlight potentially important documents.",
      outcomes: ["Review 10,000+ documents per hour", "Finds confidential content for review", "Ranks documents by importance"]
    },
    {
      icon: <Eye className="h-6 w-6 text-purple-400" />,
      title: "Privacy Protection & Redaction",
      description: "Automatically identify and remove private information and sensitive content while keeping document structure and readability intact.",
      outcomes: ["Privacy law compliant", "Keeps document formatting", "Tracks all privacy changes"]
    },
    {
      icon: <BookOpen className="h-6 w-6 text-yellow-400" />,
      title: "Legal Research & Case Analysis",
      description: "Analyze court cases, laws, regulations, and legal precedents. Create detailed research summaries with proper references and location-specific insights.",
      outcomes: ["Research across multiple areas", "Automatic referencing", "Precedent analysis"]
    },
    {
      icon: <CheckSquare className="h-6 w-6 text-cyan-400" />,
      title: "Compliance Monitoring",
      description: "Review documents for regulatory compliance, extract relevant information, and create compliance reports with risk evaluations.",
      outcomes: ["Finds regulatory gaps", "Risk evaluation and solutions", "Automated compliance reports"]
    },
    {
      icon: <Gavel className="h-6 w-6 text-red-400" />,
      title: "Court Filing Support",
      description: "Extract information from court documents, prepare filing summaries, check format requirements, and ensure all necessary information is included.",
      outcomes: ["Follows court rules", "Alerts to missing information", "Automatic form completion"]
    }
  ];

  const complianceFeatures = [
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: "100% Private Processing",
      description: "All processing happens on your own computers. Client data never leaves your office, ensuring complete confidentiality."
    },
    {
      icon: <Lock className="h-8 w-8 text-green-400" />,
      title: "Works Without Internet",
      description: "Unlike online solutions, GURU works entirely offline. No internet connection needed for core functions, eliminating security risks."
    },
    {
      icon: <Database className="h-8 w-8 text-purple-400" />,
      title: "You Control Your Data",
      description: "You own and control all your data. No third-party access, no data collection, no ongoing subscriptions needed for your past work."
    },
    {
      icon: <Scale className="h-8 w-8 text-yellow-400" />,
      title: "Full Activity Tracking",
      description: "Built-in logging for all decisions and processing steps. Meets requirements for legal record-keeping and professional standards."
    }
  ];

  const pilotDetails = [
    {
      icon: <Calendar className="h-6 w-6 text-blue-400" />,
      title: "2-4 Week Timeline",
      description: "Quick setup and testing with your actual case files and work processes."
    },
    {
      icon: <Target className="h-6 w-6 text-green-400" />,
      title: "Clear Success Measures",
      description: "Testing accuracy on key areas, processing speed checks, and result validation."
    },
    {
      icon: <Users className="h-6 w-6 text-purple-400" />,
      title: "Dedicated Support",
      description: "Direct access to our legal technology specialists throughout the pilot period."
    },
    {
      icon: <Shield className="h-6 w-6 text-yellow-400" />,
      title: "Safe Testing Approach",
      description: "Start with regular documents, controlled testing, and human oversight procedures."
    }
  ];

  return (
    <div className="min-h-screen text-white relative">
      <Navbar />
      
      <div className="relative">
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>
        
        {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden z-10">
        <motion.div 
          ref={heroRef}
          className="container mx-auto px-4 relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-block"
          >
            <div className="relative">
              <ShineBorder 
                className="absolute inset-0 rounded-full" 
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                duration={8}
              />
              <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-black/30">
                <Scale className="w-4 h-4 mr-2" />
                Private AI Assistant
              </Badge>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white"
          >
            AI That Stays Private for Law Firms
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Review contracts, filings, and documents with high accuracy—entirely private, no data sharing, full activity tracking.
            Cut review time by 70% while maintaining complete confidentiality and professional standards.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <div className="relative overflow-hidden rounded-full">
              <ShineBorder 
                className="absolute inset-0" 
                borderWidth={2}
                shineColor={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.7)"]}
                duration={10}
              />
              <Button 
                asChild
                className="relative w-full sm:w-auto bg-white hover:bg-gray-100 text-black font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 text-base h-auto min-w-[200px] sm:min-w-[200px] transform hover:scale-105"
                size="lg"
              >
                <Link href="/contact">Start Your Trial (Limited Spots)</Link>
              </Button>
            </div>

            <div className="relative overflow-hidden rounded-full">
              <ShineBorder 
                className="absolute inset-0" 
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.4)"]}
                duration={14}
              />
              <Button 
                variant="outline"
                onClick={() => useCasesRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="relative w-full sm:w-auto bg-black/30 hover:bg-black/50 text-white border border-white/30 font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 text-base h-auto backdrop-blur-md min-w-[200px] sm:min-w-[200px] transform hover:scale-105"
                size="lg"
              >
                See Real Examples (No Obligation)
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Demonstration Video */}
      <section className="relative px-4 pb-24">
        <div className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg border border-white/10">
          <video
            ref={videoRef}
            loop
            preload="metadata"
            className="w-full h-auto rounded-none cursor-pointer"
            onClick={handleVideoClick}
          >
            <source src="/Legal_Document_to_Digital_Data.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Legal Use Cases Section */}
      <section className="relative py-24 overflow-hidden z-10">
        <motion.div 
          ref={useCasesRef}
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={useCasesInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <div className="relative inline-block mb-6">
              <ShineBorder 
                className="absolute inset-0 rounded-full" 
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
                duration={12}
              />
              <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-black/30">
                Legal Solutions
              </Badge>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Solve Real Legal Problems
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              From contract review to document discovery, GURU handles your most complex legal work with accuracy and complete privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalUseCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={useCasesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={15 + index * 2}
                />
                <Card className="relative h-full p-6 bg-transparent border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-white/5 hover:bg-white/5 group-hover:scale-[1.08]">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-white/5 mb-4">
                      {useCase.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{useCase.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Key Outcomes:</div>
                    {useCase.outcomes.map((outcome, outcomeIndex) => (
                      <div key={outcomeIndex} className="flex items-center text-sm text-gray-400">
                        <ChevronRight className="h-3 w-3 text-green-400 mr-2" />
                        {outcome}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Compliance & Trust Section */}
      <section className="relative py-24 overflow-hidden z-10">
        <motion.div 
          ref={complianceRef}
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={complianceInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <div className="relative inline-block mb-6">
              <ShineBorder 
                className="absolute inset-0 rounded-full" 
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
                duration={12}
              />
              <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-black/30">
                Trust & Security
              </Badge>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Why Private AI Beats Online Solutions for Law
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Complete confidentiality, predictable costs, and no third-party data access. Built for the unique needs of legal work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {complianceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={complianceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={18 + index * 2}
                />
                <Card className="relative h-full p-8 bg-transparent border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-white/5 hover:bg-white/5 group-hover:scale-[1.08]">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-white/5 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Compliance Information */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={complianceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="relative">
              <ShineBorder 
                className="absolute inset-0 rounded-2xl opacity-70" 
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.5)"]}
                duration={20}
              />
              <Card className="relative p-8 bg-transparent border-white/10 backdrop-blur-sm">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Ready for Professional Use</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
                    <div>
                      <div className="font-semibold text-white mb-2">Privacy Protection</div>
                      <div>Privacy law compliant by design</div>
                      <div>No data transfer or storage</div>
                      <div>Complete client confidentiality</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-2">Professional Standards</div>
                      <div>Professional guidance compatible</div>
                      <div>Activity tracking included</div>
                      <div>Team permission controls</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-2">Risk Management</div>
                      <div>No third-party data access</div>
                      <div>Predictable cost structure</div>
                      <div>No internet dependencies</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonial Section */}
      <section className="relative py-16 overflow-hidden z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="flex justify-center">
            <img
              src="/Gemini_Generated_Image_7nedlk7nedlk7ned.png"
              alt="GURU Confidential AI Paralegal Interface"
              className="rounded-lg shadow-lg border border-white/10 w-full max-w-4xl"
              width={1200}
              height={700}
            />
          </div>
        </motion.div>
      </section>

      {/* Pilot Program Section */}
      <section className="relative py-24 overflow-hidden z-10">
        <motion.div 
          ref={pilotRef}
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={pilotInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <div className="relative inline-block mb-6">
              <ShineBorder 
                className="absolute inset-0 rounded-full" 
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
                duration={12}
              />
              <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-black/30">
                Get Started
              </Badge>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Start with a Controlled Trial
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              Test GURU with your actual work in a safe environment. Clear goals, measurable results, and dedicated support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {pilotDetails.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={pilotInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={12 + index * 3}
                />
                <Card className="relative h-full p-6 bg-transparent border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-white/5 hover:bg-white/5 group-hover:scale-[1.08] text-center">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-white/5 mx-auto mb-4">
                    {detail.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{detail.title}</h3>
                  <p className="text-gray-300 text-sm">{detail.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={pilotInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <div className="relative overflow-hidden rounded-full">
                <ShineBorder
                  className="absolute inset-0"
                  borderWidth={2}
                  shineColor={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.7)"]}
                  duration={10}
                />
                <Button
                  asChild
                  className="relative w-full sm:w-auto bg-white hover:bg-gray-100 text-black font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 text-base h-auto min-w-[220px] sm:min-w-[220px] transform hover:scale-105"
                  size="lg"
                >
                  <Link href="/contact">Schedule Your Risk-Free Trial</Link>
                </Button>
              </div>
            </div>

            <p className="text-gray-500 text-sm mt-6 max-w-2xl mx-auto">
              Trial includes: Setup help, training on your documents, clear success goals, and 30-day testing period with dedicated support.
            </p>
          </motion.div>
        </motion.div>
      </section>
      </div>

      <Footer />
    </div>
  );
}
