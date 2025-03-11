/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Import your utility and custom components
import { cn } from "@/lib/utils";
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid'; 
import { AnimatedBeam } from '@/components/magicui/animated-beam';
import { TypingAnimation } from '@/components/magicui/typing-animation';
// Removed InteractiveGridPattern from some sections to prevent unwanted overlay
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';

// ShadCN UI components or your own UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Cpu, 
  Battery, 
  FileCode, 
  Building2, 
  Stethoscope, 
  GraduationCap,
  Factory, 
  Zap, 
  Lock, 
  Database, 
  Sparkles,
  Clock,
  CheckCircle2,
  Eye,
  MousePointer,
  ChevronDown
} from "lucide-react";

export default function Home() {
  // ---------------------------
  // State & Refs
  // ---------------------------
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState('enterprise');

  // Smooth scrolling refs
  const featuresRef = useRef<HTMLElement | null>(null);
  const howItWorksRef = useRef<HTMLElement | null>(null);
  const useCasesRef = useRef<HTMLElement | null>(null);
  const waitlistRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  // Update scroll function type
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation refs
  const aboutContainerRef = useRef(null);
  const aboutFromRef = useRef(null);
  const aboutToRef = useRef(null);
  const howItWorksContainerRef = useRef(null);
  const howItWorksFromRef = useRef(null);
  const howItWorksToRef = useRef(null);

  // Parallax animation
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  // Product feature list
  const highlightFeatures = [
    {
      title: "100% Private Inference",
      description: "Your data never leaves your device. GURU runs all AI models locally on the NVIDIA Orin Jetson.",
      icon: <Shield className="h-8 w-8 text-cyan-400" />,
      stat: "Zero data sharing",
    },
    {
      title: "Edge Computing Power",
      description: "NVIDIA Orin delivers 67 TOPS of compute power, enough to run advanced LLMs and vision models locally.",
      icon: <Cpu className="h-8 w-8 text-cyan-400" />,
      stat: "67 TOPS",
    },
    {
      title: "Extended Battery Life",
      description: "Go anywhere with up to 8 hours of continuous AI operation on a single charge.",
      icon: <Battery className="h-8 w-8 text-cyan-400" />,
      stat: "8+ hour runtime",
    },
    {
      title: "Multi-Modal Input",
      description: "Process text, images, audio, and more with our proprietary OmniParser technology.",
      icon: <FileCode className="h-8 w-8 text-cyan-400" />,
      stat: "5 input modalities",
    }
  ];

  // Bento items
  const bentoItems = [
    {
      title: "On-Device Inference",
      description: "All inference happens locally on the NVIDIA Orin Jetson. Your data never leaves your device.",
      icon: <Lock className="h-6 w-6 text-cyan-400" />,
      className: "md:col-span-2",
    },
    {
      title: "Modular Architecture",
      description: "Easily extend GURU with additional hardware modules for your specific use case.",
      icon: <Database className="h-6 w-6 text-cyan-400" />,
      className: "md:col-span-1",
    },
    {
      title: "Battery Powered",
      description: "Up to 8 hours of continuous operation on a single charge, perfect for mobile use cases.",
      icon: <Zap className="h-6 w-6 text-cyan-400" />,
      className: "md:col-span-1",
    },
    {
      title: "OmniParser Integration",
      description: "Process diverse data formats with our proprietary parsing engine. Text, images, audio - GURU understands it all.",
      icon: <FileCode className="h-6 w-6 text-cyan-400" />,
      className: "md:col-span-2",
    },
  ];

  // Case studies
  const caseStudies = {
    enterprise: {
      title: "Acme Corp Improves Security & Efficiency(Example)",
      description: "Acme implemented GURU devices for their sales team, enabling secure customer data processing without cloud connectivity. Result: 42% faster customer service response times while maintaining strict data privacy compliance.",
      stats: [
        { label: "Faster Response", value: "42%" },
        { label: "Data Breaches", value: "0" },
        { label: "ROI", value: "389%" }
      ]
    },
    healthcare: {
      title: "Memorial Hospital Enhances Patient Privacy(Example)",
      description: "Memorial Hospital deployed GURU units in their diagnostic department to process patient data locally. Result: Maintained HIPAA compliance while improving diagnostic speed by 37% and reducing cloud infrastructure costs by 61%.",
      stats: [
        { label: "HIPAA Compliant", value: "100%" },
        { label: "Faster Diagnosis", value: "37%" },
        { label: "Cost Reduction", value: "61%" }
      ]
    },
    education: {
      title: "Westfield University Personalizes Learning(Example)",
      description: "Westfield equipped 250 classrooms with GURU devices, enabling personalized AI assistance without sharing student data. Result: 29% improvement in student engagement and complete elimination of data privacy concerns.",
      stats: [
        { label: "Engagement Increase", value: "29%" },
        { label: "Privacy Concerns", value: "0" },
        { label: "Faculty Approval", value: "94%" }
      ]
    },
    manufacturing: {
      title: "GlobalTech Optimizes Production Line(Example)",
      description: "GlobalTech integrated GURU into their manufacturing pipeline for real-time quality control and predictive maintenance. Result: 53% reduction in defects and 27% decrease in unplanned downtime.",
      stats: [
        { label: "Defect Reduction", value: "53%" },
        { label: "Downtime Decrease", value: "27%" },
        { label: "Annual Savings", value: "$3.2M" }
      ]
    }
  };

  // Typing animation phrases
  const typingPhrases = [
    "Your Privacy-First AI Assistant",
    "Powerful Edge Computing",
    "No Internet Required",
    "Ultra-Fast Responses",
    "Zero Data Sharing",
    "Own Your AI, Own Your Data"
  ];

  // Specs table
  const productSpecs = [
    { name: "Processor", value: "NVIDIA Jetson Orin Nano 8GB" },
    { name: "Computing Power", value: "67 TOPS" },
    { name: "RAM", value: "8GB LPDDR5/Module" },
    { name: "Storage", value: "1TB NVMe SSD" },
    { name: "Battery Life", value: "8+ hours (continuous)" },
    { name: "Connectivity", value: "Wi-Fi 6E, Bluetooth 5.2, USB-C, HDMI" },
    { name: "Dimensions", value: "8.5\" x 5.2\" x 0.9\"" },
    { name: "Weight", value: "1.9 lbs (860g)" },
  ];

  // Rotate active feature
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIndex(prev => (prev + 1) % highlightFeatures.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [highlightFeatures.length]);


  // Form handling
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-cyan-950 text-white">
      {/* ------------- Hero Section ------------- */}
      <section 
        ref={heroRef}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Subtle Grid Pattern behind hero */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: heroOpacity }}
        >
          <InteractiveGridPattern className="w-full h-full" dotColor="rgba(6, 182, 212, 0.15)" />
        </motion.div>

        {/* Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center">
                {/* Replace with your actual logo image */}
                <Image 
                  src="/logo-guru.svg"
                  alt="GURU Logo"
                  width={120}
                  height={40}
                />
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <button onClick={() => scrollToSection(featuresRef)} className="text-gray-300 hover:text-cyan-400 transition">
                  Features
                </button>
                <button onClick={() => scrollToSection(howItWorksRef)} className="text-gray-300 hover:text-cyan-400 transition">
                  How It Works
                </button>
                <button onClick={() => scrollToSection(useCasesRef)} className="text-gray-300 hover:text-cyan-400 transition">
                  Use Cases
                </button>
                <button onClick={() => scrollToSection(waitlistRef)} className="text-white bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full transition">
                  Join Waitlist
                </button>
              </div>
              <button className="md:hidden text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <motion.div 
          className="container mx-auto px-4 z-10 text-center"
          style={{ y: heroY }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-block"
          >
            <Badge variant="outline" className="text-cyan-400 border-cyan-400 px-4 py-1 text-sm font-semibold">
              Introducing
            </Badge>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            Meet <span className="text-cyan-400 inline-block relative">
              GURU
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 1 }}
              />
            </span>
          </motion.h1>

          {/* Dynamic tagline with typing animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-12 mb-6"
          >
            <TypingAnimation phrases={typingPhrases} className="text-xl md:text-2xl text-cyan-200" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8"
          >
            The revolutionary, <strong>privacy-first AI assistant</strong> that keeps your data where it belongs — with you.
            <span className="block mt-2 text-cyan-300 font-medium">Pre-orders starting Q3 2025</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              onClick={() => scrollToSection(waitlistRef)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg text-lg h-auto"
              size="lg"
            >
              Reserve Yours Now
            </Button>

            <Button
              variant="outline"
              onClick={() => scrollToSection(featuresRef)}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/30 font-semibold py-3 px-8 rounded-full transition duration-300 text-lg h-auto"
              size="lg"
            >
              Explore Features
            </Button>
          </motion.div>

          {/* Product highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {highlightFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className={`bg-slate-800/30 border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 overflow-hidden 
                  ${index === activeFeatureIndex ? 'ring-2 ring-cyan-500/50' : ''}`}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 mx-auto bg-cyan-500/10 rounded-full flex items-center justify-center mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-cyan-300 text-sm font-mono">{feature.stat}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Scroll prompt */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-12 left-0 right-0 flex justify-center"
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 cursor-pointer"
              onClick={() => scrollToSection(featuresRef)}
            >
              <ChevronDown className="text-white/80 w-8 h-8" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ------------- Product Video & Visual Showcase ------------- */}
      <section className="w-full min-h-screen py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
              SEE GURU IN ACTION
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Privacy-First AI <span className="text-cyan-400">Without Compromise</span>
            </h2>
            
            <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-slate-700/50">
              <div className="relative aspect-video bg-slate-800">
                {/* Placeholder for video */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {!isVideoPlaying ? (
                    <button 
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-20 h-20 rounded-full bg-cyan-500/90 flex items-center justify-center hover:bg-cyan-500 transition-all duration-300 shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  ) : (
                    <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center">
                      <h3 className="text-white text-xl">Video would play here</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Product specs preview */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
              {productSpecs.slice(0, 4).map((spec, i) => (
                <div key={i} className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/40 text-center">
                  <p className="text-gray-400 text-sm mb-1">{spec.name}</p>
                  <p className="text-cyan-300 font-mono font-medium">{spec.value}</p>
                </div>
              ))}
            </div>
            
            <Button variant="link" className="mt-4 text-cyan-400">
              View Full Specifications
            </Button>
          </div>
        </div>
      </section>

      {/* ------------- Features Section ------------- */}
      <section ref={featuresRef} className="w-full min-h-screen py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/30 mx-auto block w-fit">
            CAPABILITIES
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            A Revolution in <span className="text-cyan-400">Privacy-First AI</span>
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Feature Carousel */}
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-700 bg-slate-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeatureIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="p-8 text-center">
                      <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        {highlightFeatures[activeFeatureIndex].icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">
                        {highlightFeatures[activeFeatureIndex].title}
                      </h3>
                      <p className="text-gray-300 max-w-lg mx-auto">
                        {highlightFeatures[activeFeatureIndex].description}
                      </p>
                      <div className="mt-6">
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                          {highlightFeatures[activeFeatureIndex].stat}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="flex justify-center mt-6 gap-2">
                {highlightFeatures.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeFeatureIndex ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                    onClick={() => setActiveFeatureIndex(index)}
                  />
                ))}
              </div>
            </div>
            
            {/* Bento Grid: removed background prop so text doesn’t appear on tile backgrounds */}
            <div className="lg:w-1/2">
              <BentoGrid className="max-w-2xl">
                {bentoItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <BentoCard
                    name={item.title}           // <--- pass the required 'name'
                    background={<div />}        // <--- minimal background or <div className="some-bg" />
                    className={item.className}
                    Icon={() => item.icon}
                    description={item.description}
                    href="#"
                    cta="Learn More"
                   />

                  </motion.div>
                ))}
              </BentoGrid>
              
              <div className="mt-8">
                <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                  <FileCode className="mr-2 h-4 w-4" /> 
                  Download Technical Whitepaper
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------- About / Vision Section ------------- */}
      <section className="w-full min-h-screen py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Side Text */}
            <div className="md:w-1/2 order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Vision for a <span className="text-cyan-400">Privacy-Driven Future</span>
                </h2>
                
                <p className="text-gray-300 mb-6 text-lg">
                  GURU is built on the belief that <span className="font-semibold text-white">AI should amplify human potential without sacrificing privacy</span>. Running entirely on-device using NVIDIA Orin, your data remains completely under your control.
                </p>
                
                <div 
                  ref={aboutContainerRef}
                  className="relative my-6 p-4 bg-slate-800/40 border border-cyan-500/20 rounded-lg"
                >
                  <div ref={aboutFromRef} className="absolute top-[20%] left-[10%] h-2 w-2" />
                  <div ref={aboutToRef} className="absolute top-[70%] left-[70%] h-2 w-2" />
                  
                  <AnimatedBeam
                    containerRef={aboutContainerRef}
                    fromRef={aboutFromRef}
                    toRef={aboutToRef}
                    pathColor="white"
                    pathWidth={2}
                    pathOpacity={0.2}
                    gradientStartColor="#06b6d4"
                    gradientStopColor="#3b82f6"
                    duration={4}
                  />
                  
                  <blockquote className="text-cyan-300 italic px-6 py-2 relative z-10">
                    "We believe privacy isn't just a feature—it's a fundamental right. GURU represents our commitment to building AI that respects this principle unconditionally."
                    <footer className="text-white mt-2 font-medium">— Krish Dokania, Founder & CEO</footer>
                  </blockquote>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Our modular design empowers diverse sectors with instant, edge-based AI that adapts to your specific needs while keeping your data completely private.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {["Privacy", "Edge AI", "Modular", "Low Power", "Secure", "Adaptable"].map((tag, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-cyan-400 border-cyan-500/50 bg-cyan-500/5 px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Right Side Image / Device */}
            <div className="md:w-1/2 relative h-[500px] order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute inset-0 bg-slate-800/20 rounded-2xl overflow-hidden border border-slate-700 flex items-center justify-center"
              >
                <div className="w-48 h-48 md:w-64 md:h-64 relative">
                  <div className="absolute inset-0 animate-pulse bg-cyan-500/20 rounded-full" />
                  {/* Replace with actual device image */}
                  <Image 
                    src="/product-hero.webp" 
                    alt="GURU Device" 
                    width={300} 
                    height={300}
                    className="object-contain"
                  />
                </div>
                {/* Removed random orbiting icons to avoid SSR hydration issues */}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------- How It Works Section ------------- */}
      <section ref={howItWorksRef} className="w-full min-h-screen py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/30 mx-auto block w-fit">
            TECHNOLOGY
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            How <span className="text-cyan-400">GURU</span> Works
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div 
              ref={howItWorksContainerRef}
              className="relative p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 overflow-hidden"
            >
              <div ref={howItWorksFromRef} className="absolute top-[30%] left-[20%] h-2 w-2" />
              <div ref={howItWorksToRef} className="absolute top-[70%] left-[80%] h-2 w-2" />
              
              <AnimatedBeam
                containerRef={howItWorksContainerRef}
                fromRef={howItWorksFromRef}
                toRef={howItWorksToRef}
                pathColor="white"
                pathWidth={2}
                pathOpacity={0.1}
                gradientStartColor="#06b6d4"
                gradientStopColor="#3b82f6"
                duration={3}
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <ol className="relative border-l border-cyan-500/50 space-y-12">
                  <li className="ml-6">
                    <div className="absolute w-10 h-10 -left-5 bg-slate-800 border-2 border-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">On-Device Processing</h3>
                    <p className="text-gray-300">
                      GURU processes all AI tasks locally on the NVIDIA Jetson Orin, with no data sent to external servers. Your information never leaves your device, ensuring complete privacy and security.
                    </p>
                  </li>
                  
                  <li className="ml-6">
                    <div className="absolute w-10 h-10 -left-5 bg-slate-800 border-2 border-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">OmniParser Technology</h3>
                    <p className="text-gray-300">
                      Our proprietary OmniParser technology intelligently processes diverse data formats - including text, images, audio, and more - allowing GURU to understand and respond to any input.
                    </p>
                  </li>
                  
                  <li className="ml-6">
                    <div className="absolute w-10 h-10 -left-5 bg-slate-800 border-2 border-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">AI Model Optimization</h3>
                    <p className="text-gray-300">
                      GURU runs optimized versions of state-of-the-art AI models specifically designed for edge computing, delivering powerful performance without the need for cloud connectivity.
                    </p>
                  </li>
                  
                  <li className="ml-6">
                    <div className="absolute w-10 h-10 -left-5 bg-slate-800 border-2 border-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-bold">4</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Modular Expansion</h3>
                    <p className="text-gray-300">
                      Extend GURU's capabilities with additional hardware modules tailored to your specific use case, from advanced sensor arrays to specialized processing accelerators.
                    </p>
                  </li>
                </ol>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                viewport={{ once: true }}
                className="bg-slate-800/60 p-6 rounded-lg border border-slate-700/50 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="font-semibold mb-2">Real-Time Response</h3>
                <p className="text-gray-300 text-sm">
                  Get instant responses with ultra-low latency, even for complex queries.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/60 p-6 rounded-lg border border-slate-700/50 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="font-semibold mb-2">Always Available</h3>
                <p className="text-gray-300 text-sm">
                  Works without internet connectivity, perfect for remote locations.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-800/60 p-6 rounded-lg border border-slate-700/50 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="font-semibold mb-2">Complete Privacy</h3>
                <p className="text-gray-300 text-sm">
                  Never sends your data to the cloud, ensuring total data sovereignty.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------- Use Cases with Tabs ------------- */}
      <section ref={useCasesRef} className="w-full min-h-screen py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/30 mx-auto block w-fit">
            APPLICATIONS
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            How <span className="text-cyan-400">Industries</span> Use GURU
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <Tabs 
              defaultValue="enterprise" 
              value={activeCaseStudy}
              onValueChange={setActiveCaseStudy}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-slate-800/50 p-1">
                <TabsTrigger 
                  value="enterprise" 
                  className="data-[state=active]:text-cyan-400 data-[state=active]:bg-cyan-500/10"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Enterprise
                </TabsTrigger>
                <TabsTrigger 
                  value="healthcare" 
                  className="data-[state=active]:text-cyan-400 data-[state=active]:bg-cyan-500/10"
                >
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Healthcare
                </TabsTrigger>
                <TabsTrigger 
                  value="education" 
                  className="data-[state=active]:text-cyan-400 data-[state=active]:bg-cyan-500/10"
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Education
                </TabsTrigger>
                <TabsTrigger 
                  value="manufacturing" 
                  className="data-[state=active]:text-cyan-400 data-[state=active]:bg-cyan-500/10"
                >
                  <Factory className="h-4 w-4 mr-2" />
                  Manufacturing
                </TabsTrigger>
              </TabsList>
              
              {(Object.keys(caseStudies) as (keyof typeof caseStudies)[]).map((key) => (
                <TabsContent key={key} value={key}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">
                      {caseStudies[key].title}
                    </h3>
                    <p className="text-gray-300 mb-8">
                      {caseStudies[key].description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {caseStudies[key].stats.map((stat, i) => (
                        <div
                          key={i}
                          className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 text-center"
                        >
                          <p className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</p>
                          <p className="text-gray-300 text-sm">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                      <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                        <MousePointer className="mr-2 h-4 w-4" />
                        Read Full Case Study
                      </Button>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* ------------- Waitlist Section ------------- */}
      <section 
        ref={waitlistRef} 
        className="w-full min-h-screen py-24 bg-slate-900 relative overflow-hidden"
      >
        {/* You can remove the pattern entirely if you don’t want a grid at the end. */}
        <div className="absolute inset-0">
          <InteractiveGridPattern 
            className="w-full h-full" 
            dotColor="rgba(6, 182, 212, 0.15)" 
            size={30}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/30 mx-auto">
              EARLY ACCESS
            </Badge>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join the Waitlist
            </h2>
            
            <p className="text-xl text-gray-300 mb-12">
              Be among the first to experience the privacy revolution in AI. 
              Reserve your GURU device today with priority access when we launch.
            </p>
            
            <div className="bg-slate-800/50 p-8 rounded-xl border border-cyan-500/20 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="w-full max-w-md mb-6">
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2 text-left">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg flex items-center"
                  disabled={submitted}
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Thank You!
                    </>
                  ) : (
                    "Reserve Your GURU"
                  )}
                </Button>
                
                <p className="mt-4 text-sm text-gray-400">
                  By joining, you'll receive exclusive updates and early-bird pricing.
                </p>
              </form>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2" />
                  <span className="text-gray-300 text-sm">Priority Access</span>
                </div>
                
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2" />
                  <span className="text-gray-300 text-sm">Early Bird Pricing</span>
                </div>
                
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2" />
                  <span className="text-gray-300 text-sm">Exclusive Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------- Footer ------------- */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <Image 
                src="/logo-guru.svg" 
                alt="GURU Logo" 
                width={120} 
                height={40}
              />
            </div>
            
            <div className="flex flex-wrap gap-6">
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">Features</Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">Technology</Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">Use Cases</Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">About Us</Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">Blog</Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">Contact</Link>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 GURU AI Technologies. All rights reserved.
            </p>
            
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-cyan-400 transition">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-cyan-400 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
