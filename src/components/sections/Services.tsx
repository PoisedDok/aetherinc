"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Settings, 
  BrainCircuit, 
  Workflow, 
  Shield, 
  Building,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const serviceTypes = [
    {
      name: "AI Strategy & Consulting",
      icon: <BrainCircuit className="h-8 w-8" />,
      description: "Transform your business with privacy-first AI solutions tailored to your industry",
      color: "gray",
      features: [
        "AI readiness assessment",
        "Privacy-first implementation strategy",
        "Custom AI solution architecture",
        "ROI analysis & business case development",
        "Team training & knowledge transfer",
        "Ongoing optimization support"
      ],
      duration: "2-8 weeks",
      deliverables: [
        "Comprehensive AI strategy report",
        "Implementation roadmap",
        "Technical architecture design",
        "Training materials & documentation"
      ]
    },
    {
      name: "Workflow Automation",
      icon: <Workflow className="h-8 w-8" />,
      description: "Automate complex business processes with intelligent AI-powered workflows",
      color: "slate",
      features: [
        "Process analysis & optimization",
        "Custom workflow design",
        "AI-powered decision automation",
        "Integration with existing systems",
        "Real-time monitoring & analytics",
        "Continuous improvement optimization"
      ],
      duration: "3-12 weeks",
      deliverables: [
        "Automated workflow systems",
        "Integration documentation",
        "Performance monitoring dashboard",
        "User training & support"
      ]
    },
    {
      name: "Local AI Implementation",
      icon: <Shield className="h-8 w-8" />,
      description: "Deploy powerful AI solutions on your premises with complete data sovereignty",
      color: "white",
      features: [
        "On-premise AI deployment",
        "Custom model fine-tuning",
        "Data privacy compliance",
        "Security hardening",
        "Performance optimization",
        "24/7 monitoring & support"
      ],
      duration: "4-16 weeks",
      deliverables: [
        "Fully deployed AI infrastructure",
        "Custom trained models",
        "Security audit report",
        "Maintenance & support plan"
      ]
    }
  ];

  const workflowSteps = [
    {
      step: 1,
      title: "Create a knowledge base",
      description: "Train an AI agent that understands your ICP, differentiators & market landscape.",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      step: 2,
      title: "Build an agent",
      description: "Deploy agents using an intuitive chat-based interface – no code required.",
      icon: <Settings className="h-6 w-6" />,
    },
    {
      step: 3,
      title: "Test & deploy",
      description: "Agents run autonomously based on events in your CRM & other tools.",
      icon: <TrendingUp className="h-6 w-6" />,
    }
  ];

  const useCases = [
    {
      title: "An enterprise AE…",
      description: "Researches high-value opportunities, identifies decision-makers & enriches CRM data automatically.",
    },
    {
      title: "A life-sciences sales team…",
      description: "Runs hyper-focused outbound to biopharma accounts with recent stage-2 trial announcements.",
    },
    {
      title: "A marketing agency…",
      description: "Qualifies inbound leads & writes 11-step sequences referencing similar clients in seconds.",
    },
    {
      title: "An insurance company…",
      description: "Guides strategic investments by monitoring economic, climate & competitor research in real-time.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-black via-slate-950 to-black py-24 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem]" />
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
            AI Services
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Transform Your Business with Privacy-First AI
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Expert AI consulting and automation services while we develop GURU and AetherArena. 
            Learn market requirements, fund development, and help businesses succeed with local AI.
          </p>
        </motion.div>

        {/* Service Types */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
        >
          {serviceTypes.map((service, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="relative group"
            >
              <Card className="bg-gradient-to-br from-slate-900/80 to-black/60 backdrop-blur-sm border-white/10 hover:border-gray-500/30 transition-all duration-300 h-full">
                <div className="p-8">
                  {/* Service Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-black shadow-lg shadow-white/10">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{service.name}</h3>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Duration */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="outline" className="text-gray-400 border-gray-600">
                      {service.duration}
                    </Badge>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">What's Included</h4>
                    <div className="space-y-2">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Deliverables</h4>
                    <div className="space-y-1">
                      {service.deliverables.map((deliverable, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          <span className="text-gray-300 text-sm">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-400/30 text-gray-200 hover:bg-gray-700/20"
                    asChild
                  >
                    <Link href="/contact">
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.4 }
            }
          }}
          className="max-w-6xl mx-auto mb-20"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Build AI agents in minutes – no technical skills required
            </h3>
            <p className="text-gray-300 text-lg">
              A simple 3-step workflow to go from knowledge to production-ready agents
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="relative"
              >
                <Card className="bg-black/40 backdrop-blur-sm border-white/10 hover:border-gray-500/30 transition-all duration-300 text-center">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex flex-col items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-600 flex items-center justify-center text-black font-bold">
                        {step.step}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-gray-600/20 flex items-center justify-center text-gray-300">
                        {step.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-gray-300 text-sm mb-1">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Collaborate Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.6 }
            }
          }}
          className="max-w-6xl mx-auto"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Collaborate with AI agents to 10× performance
            </h3>
            <p className="text-gray-300 text-lg">
              See how teams leverage privacy-first AI to accelerate outcomes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-slate-900/80 to-black/60 backdrop-blur-sm border-white/10 hover:border-gray-500/30 transition-all duration-300 h-full">
                  <div className="p-6 h-full flex flex-col">
                    <h4 className="text-lg font-semibold text-white mb-3">{useCase.title}</h4>
                    <p className="text-gray-300 text-sm flex-grow">{useCase.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="max-w-4xl mx-auto mt-20 text-center"
        >
          <Card className="bg-gradient-to-br from-slate-900/80 to-black/60 backdrop-blur-sm border-white/10">
            <div className="p-8">
              <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Business?</h4>
              <p className="text-gray-300 text-lg mb-6">
                Join forward-thinking companies leveraging privacy-first AI solutions. 
                Let's discuss how we can help you achieve your AI goals while maintaining complete data sovereignty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-white to-gray-500 text-black hover:from-gray-100 hover:to-gray-600" asChild>
                  <Link href="/contact">
                    Schedule Consultation
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800" asChild>
                  <Link href="/ai-tools">
                    Explore AI Tools Database
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
} 