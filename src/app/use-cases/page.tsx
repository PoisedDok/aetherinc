"use client";

import React from 'react';
import Navbar from '@/components/Navbar'; // Adjust path if needed
import Footer from '@/components/Footer'; // Adjust path if needed
import { motion } from 'framer-motion';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BackToTop } from '@/components/ui/back-to-top';
import { ArrowRight, Mic, Code, Bot, FileText, ShieldCheck, Briefcase, CodeXml, FileSearch, Headphones, Link as LinkIcon, RadioTower, ShieldQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Adjust path if needed
import Link from 'next/link';
import { cn } from "@/lib/utils"; // Import cn utility
import { ShineBorder } from '@/components/magicui/shine-border'; // Import ShineBorder for effect

// Updated data focusing on autonomous workflows
const useCases = [
  {
    title: "Autonomous Meeting Assistant",
    description: "GURU joins your calls, records (privately), transcribes, summarizes, identifies action items, and even drafts follow-up emails – all locally.",
    steps: [
      "User: \"GURU, handle my 10 AM project sync.\"",
      "GURU connects to call & manages recording/transcription.",
      "On-device LLM processes conversation in real-time.",
      "Post-call: Summary & action items ready on GURU.",
      "GURU: \"Drafted follow-up based on action items. Review? \"",
    ],
    icon: <Headphones size={28} className="text-cyan-400" />,
    tags: ["Productivity", "Automation", "Meetings", "Privacy"],
  },
  {
    title: "Secure Cross-Platform Development",
    description: "Generate code, test, and debug within GURU's secure environment. GURU can then safely deploy or transfer code to your workspace/computer.",
    steps: [
      "User: \"GURU, scaffold a Python API for user auth.\"",
      "GURU generates code locally, using its knowledge base.",
      "User tests/iterates with GURU within its environment.",
      "GURU performs local security checks.",
      "User: \"Deploy to my staging server.\" (GURU handles transfer)",
    ],
    icon: <CodeXml size={28} className="text-green-400" />,
    tags: ["Development", "Security", "Automation", "Coding"],
  },
  {
    title: "Proactive Workspace Partner",
    description: "GURU connects to your approved workspaces (computer, phone), observes context (with permission), and proactively assists or awaits voice commands.",
    steps: [
      "User enables workspace connection.",
      "GURU observes current application/document (locally processed).",
      "User: \"GURU, find that Q3 report Jones sent.\"",
      "GURU searches connected device/its own knowledge base.",
      "GURU presents file or relevant info directly.",
    ],
    icon: <LinkIcon size={28} className="text-purple-400" />,
    tags: ["Integration", "Hands-Free", "Productivity", "Contextual AI"],
  },
    {
    title: "Intelligent Knowledge Synthesis",
    description: "Ask complex questions across your entire 10TB knowledge base (notes, files, web data). GURU synthesizes answers, not just finds keywords.",
    steps: [
      "User: \"GURU, summarize the key differences between our proposal and Competitor X's leaked specs.\"",
      "GURU accesses relevant local documents.",
      "On-device LLM analyzes, compares, and synthesizes.",
      "GURU provides a concise, synthesized answer.",
      "User: \"Based on that, draft a counter-argument slide.\"",
    ],
    icon: <FileSearch size={28} className="text-yellow-400" />,
    tags: ["Knowledge Management", "Research", "Analysis", "LLM"],
  },
  {
    title: "Autonomous Task Execution",
    description: "Delegate multi-step tasks. GURU uses reasoning to plan, execute (asking for critical permissions), and report back.",
    steps: [
      "User: \"GURU, research top 3 local catering options for the team lunch (under $20/head), check their availability for Friday, and draft an email poll.\"",
      "GURU uses local reasoning & internet access.",
      "Performs web searches, extracts data (locally).",
      "GURU: \"Need permission to access calendar for availability? \"",
      "Executes steps, drafts poll, presents results.",
    ],
    icon: <Bot size={28} className="text-orange-400" />,
    tags: ["Automation", "Reasoning", "Delegation", "Hands-Free"],
  },
  {
    title: "Ethical Interaction Guardrails",
    description: "GURU includes built-in reasoning to recognize and refuse harmful, unethical, or potentially dangerous requests, ensuring safe operation.",
    steps: [
      "User: \"GURU, generate code for a phishing website.\"",
      "GURU's internal safety model flags the request.",
      "GURU: \"I cannot fulfill requests that are unethical or could cause harm.\"",
      "User: \"Find vulnerabilities in my web app.\"",
      "GURU: \"I can help with that. Let's proceed securely.\"",
    ],
    icon: <ShieldQuestion size={28} className="text-red-400" />,
    tags: ["Safety", "Ethics", "AI Reasoning", "Security"],
  },
];

export default function UseCasesPage() {
  // Dummy refs and function for Navbar compatibility - NO LONGER NEEDED
  // const dummyRef = React.useRef(null);
  // const scrollToSection = () => {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
      <ScrollProgress />
      <BackToTop />
      {/* Navbar no longer needs dummy props */}
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            GURU Use Cases
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how GURU acts as an autonomous partner, enhancing productivity and creativity while ensuring absolute privacy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative group bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-7 flex flex-col h-full shadow-lg overflow-hidden"
            >
              <ShineBorder 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                borderWidth={1}
                shineColor={["#6366f1", "#a855f7", "#ec4899"]}
                duration={8}
              />
              <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4 p-3 rounded-lg bg-white/5 w-fit shadow-inner">
                    {useCase.icon}
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-white">{useCase.title}</h2>
                  <p className="text-gray-300 text-base mb-4 flex-grow">{useCase.description}</p>
                  <div className="mb-4 mt-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Example Flow:</h3>
                    <ul className="space-y-2 text-gray-300 text-sm list-none">
                      {useCase.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                           <ArrowRight size={14} className={cn("mr-2 mt-1 flex-shrink-0", step.toLowerCase().includes("user:") ? "text-cyan-400" : "text-purple-400")} />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 border-t border-white/10 pt-4">
                     <div className="flex flex-wrap gap-2">
                      {useCase.tags.map(tag => (
                        <span key={tag} className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action - Enhanced */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-24 md:mt-32 bg-gradient-to-r from-cyan-900/30 via-blue-900/30 to-purple-900/30 border border-white/10 rounded-xl py-12 px-6 max-w-4xl mx-auto shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready for an Autonomous Partner?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">GURU offers unparalleled private AI assistance. Join the waitlist to secure yours and boost your productivity 20x.</p>
          <Link href="/#waitlist"> 
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105">
              Reserve Your GURU Now
            </Button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
} 