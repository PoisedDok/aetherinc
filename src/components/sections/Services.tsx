"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BrainCircuit, Lock, Gauge, Workflow, Users } from "lucide-react";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { BentoGrid, BentoCard, BentoGridItem } from "@/components/magicui/bento-grid";
import WorkflowsCarousel from "./WorkflowsCarousel";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Link from "next/link";

export default function Services() {
  /* Data */
  const problems = [
    {
      title: "Data overload",
      description:
        "Modern organisations generate mountains of data, but extracting insight at speed feels impossible without the right tools.",
      icon: BrainCircuit,
    },
    {
      title: "Slow decision making",
      description:
        "Disconnected systems and manual processes keep teams waiting for answers, stalling growth and innovation.",
      icon: Gauge,
    },
    {
      title: "Data-security concerns",
      description:
        "Cloud AI often requires shipping sensitive data to third-party servers. Our privacy-first stack keeps everything on-premise.",
      icon: Lock,
    },
  ];

  const solutionsData = [
    {
      Icon: BrainCircuit,
      name: "Advanced AI algorithms",
      description:
        "Proprietary models fine-tuned on-device deliver answers in milliseconds without exposing raw data to the cloud.",
      href: "/contact",
      cta: "Learn more",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-50" />
      ),
    },
    {
      Icon: Lock,
      name: "Secure data handling",
      description:
        "Zero-trust architecture, on-prem deployment and encryption-in-use ensure your information never leaves your walls.",
      href: "/contact",
      cta: "Learn more",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-50" />
      ),
    },
    {
      Icon: Workflow,
      name: "Seamless integration",
      description:
        "APIs and pre-built connectors slot directly into your existing stack so you can deploy in days, not months.",
      href: "/contact",
      cta: "Learn more",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 opacity-50" />
      ),
    },
    {
      Icon: Users,
      name: "Customisable workflows",
      description:
        "Drag-and-drop builder lets any employee automate processes—from lead enrichment to compliance checks—without code.",
      href: "/contact",
      cta: "Learn more",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 opacity-50" />
      ),
    },
  ];

  const howItWorks = [
    {
      step: "1. Connect",
      text: "Securely link your data sources and tools with out-of-the-box connectors.",
    },
    {
      step: "2. Automate",
      text: "Design AI-powered flows in a chat-like interface—no engineering needed.",
    },
    {
      step: "3. Measure & improve",
      text: "Track KPIs in real-time and iterate with one-click deployment.",
    },
  ];

  const howWeWork = [
    {
      step: "Listen",
      text: "We start by understanding your unique challenges, processes and goals.",
    },
    {
      step: "Invent",
      text: "Our team crafts custom AI solutions tailored to your specific needs.",
    },
    {
      step: "Personalize",
      text: "We fine-tune every workflow to integrate seamlessly with your existing systems.",
    },
  ];

  const features = [
    {
      title: "AI-powered admin",
      text: "Delegate repetitive configuration and maintenance tasks to smart agents that learn your preferences.",
    },
    {
      title: "Natural-language processing",
      text: "Query data or trigger workflows by simply asking—no SQL or scripting required.",
    },
    {
      title: "Data-driven company insights",
      text: "Surface trends, risks and opportunities automatically across every department.",
    },
    {
      title: "Automated reporting",
      text: "Generate audit-ready documents and dashboards on a schedule or when events occur.",
    },
  ];

  const faqs = [
    {
      q: "Is my data ever sent to the cloud?",
      a: "No. All processing happens locally or on your private infrastructure, guaranteeing full sovereignty.",
    },
    {
      q: "Do I need in-house AI expertise?",
      a: "Our drag-and-drop tools and managed support mean anyone can build and maintain workflows without writing code.",
    },
    {
      q: "How quickly can we see ROI?",
      a: "Most clients automate at least one critical workflow within the first 30 days, freeing teams for higher-value work.",
    },
  ];

  /* Animation helper */
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const howItWorksContainerRef = React.useRef<HTMLDivElement>(null);
  const platformRefs = [
    React.useRef<HTMLDivElement>(null),
    React.useRef<HTMLDivElement>(null),
    React.useRef<HTMLDivElement>(null)
  ];
  const approachRefs = [
    React.useRef<HTMLDivElement>(null),
    React.useRef<HTMLDivElement>(null),
    React.useRef<HTMLDivElement>(null)
  ];

  // State to control beam rendering after elements are mounted
  const [showBeams, setShowBeams] = React.useState(false);

  React.useEffect(() => {
    // Wait for refs to be populated
    const timer = setTimeout(() => {
      setShowBeams(true);
    }, 1500); // Increased delay to ensure elements are fully rendered
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full text-white overflow-hidden">
      <div className="container mx-auto px-4 py-20 space-y-32">
        {/* Hero */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-bold">
            Automate your workflows with AI - AetherInc
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            No matter what problem you have, our AI solutions can help you solve it.
          </p>
          <HeroVideoDialog
            className="mx-auto max-w-4xl mt-10"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="https://www.example.com/dummy-thumbnail.png"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </motion.div>

        {/* Problems */}
        <div className="space-y-8">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center text-3xl md:text-4xl font-bold"
          >
            Problems
          </motion.h3>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {problems.map((p, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="h-full bg-transparent border-white/10 p-8 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-white text-black">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="text-gray-300 text-base leading-relaxed">{p.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Solutions - Now using BentoGrid */}
        <div className="space-y-8">
          <motion.h3
          initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center text-3xl md:text-4xl font-bold"
          >
            Our Solutions
          </motion.h3>

          <BentoGrid className="md:grid-cols-2 xl:grid-cols-4 gap-6">
            {solutionsData.map((solution) => (
              <BentoCard key={solution.name} {...solution} />
            ))}
          </BentoGrid>
        </div>

        {/* How it works */}
        <div className="space-y-16">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center text-3xl md:text-4xl font-bold"
          >
            How it works
          </motion.h3>

          <div className="relative">
            <div ref={howItWorksContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[840px]">
              {/* Left column: How it works */}
              <div className="space-y-24">
                <h4 className="text-2xl font-semibold text-white/90 border-b border-white/10 pb-2">
                  The Platform
                </h4>
                {howItWorks.map((step, idx) => (
              <motion.div
                    key={idx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="flex items-start gap-6"
                    ref={platformRefs[idx]}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                        <span className="text-2xl font-bold">{step.step.split('.')[0]}</span>
                      </div>
                      <div className="h-16 w-0.5 bg-gradient-to-b from-white/10 to-transparent mt-2 hidden md:block"></div>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-white/90 block mb-3">
                        {step.step}
                      </span>
                      <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                        {step.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
                      </div>
              
              {/* Right column: How we work */}
              <div className="space-y-24">
                <h4 className="text-2xl font-semibold text-white/90 border-b border-white/10 pb-2">
                  Our Approach
                </h4>
                {howWeWork.map((step, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="flex items-start gap-6"
                    ref={approachRefs[idx]}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/10">
                        <span className="text-2xl font-bold">{idx + 1}</span>
                      </div>
                      <div className="h-16 w-0.5 bg-gradient-to-b from-white/10 to-transparent mt-2 hidden md:block"></div>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-white/80 block mb-3">
                        {step.step}
                      </span>
                      <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                        {step.text}
                      </p>
                  </div>
              </motion.div>
            ))}
          </div>
            </div>

            {/* Animated beams connecting the steps - positioned absolutely */}
            {showBeams && (
              <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff4d4d" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#ff0000" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ff4d4d" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  
                  {/* First connection - adjusted Y positions */}
                  <path 
                    d="M140,180 C300,180 500,180 700,180" 
                    stroke="url(#redGradient)" 
                    strokeWidth="3" 
                    fill="none"
                    className="connection-line"
                  />
                  
                  {/* Second connection - adjusted Y positions */}
                  <path 
                    d="M140,380 C300,380 500,380 700,380" 
                    stroke="url(#redGradient)" 
                    strokeWidth="3" 
                    fill="none"
                    className="connection-line"
                  />
                  
                  {/* Third connection - adjusted Y positions */}
                  <path 
                    d="M140,580 C300,580 500,580 700,580" 
                    stroke="url(#redGradient)" 
                    strokeWidth="3" 
                    fill="none"
                    className="connection-line"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="mt-16">
            <WorkflowsCarousel />
          </div>
        </div>

        {/* Features (moved above testimonials) */}
        <div className="space-y-8">
          <motion.h3
          initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center text-3xl md:text-4xl font-bold"
          >
            Platform Features
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Card key={i} className="p-6 bg-transparent border-white/10 space-y-3 text-center">
                <h4 className="text-lg font-semibold">{f.title}</h4>
                <p className="text-gray-300 text-base leading-relaxed">{f.text}</p>
                </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center text-3xl md:text-4xl font-bold"
          >
            What our customers are saying
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6 bg-transparent border-white/10 space-y-4">
                <p className="text-gray-300 text-base leading-relaxed">
                  "AetherInc cut our reporting time by 80% and gave our analysts space to innovate."
                </p>
                <p className="text-sm text-gray-500">— TechOps Lead, Fortune 500</p>
                </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-8">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center text-3xl md:text-4xl font-bold"
          >
            Frequently asked questions
          </motion.h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-transparent border border-white/10 rounded-lg p-4">
                <summary className="cursor-pointer text-lg font-medium" >{faq.q}</summary>
                <p className="mt-2 text-gray-300 text-base leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-16">
          <Button asChild className="px-8 py-4 text-base font-semibold">
            <Link href="/contact">Schedule a Consultation</Link>
                </Button>
              </div>
      </div>
    </section>
  );
} 