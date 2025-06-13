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
  Zap,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  FileText,
  Database,
  Cloud,
  Lock
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
      pricing: "£2,500 - £7,500",
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
      pricing: "£3,000 - £15,000",
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
      pricing: "£5,000 - £25,000",
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
      title: "Discovery & Analysis",
      description: "Deep dive into your current processes and identify AI opportunities",
      icon: <Target className="h-6 w-6" />,
      duration: "1-2 weeks"
    },
    {
      step: 2,
      title: "Strategy & Design",
      description: "Create comprehensive AI strategy with privacy-first architecture",
      icon: <FileText className="h-6 w-6" />,
      duration: "1-3 weeks"
    },
    {
      step: 3,
      title: "Development & Integration",
      description: "Build and integrate AI solutions using our curated tool stack",
      icon: <Settings className="h-6 w-6" />,
      duration: "2-8 weeks"
    },
    {
      step: 4,
      title: "Testing & Optimization",
      description: "Rigorous testing and performance optimization for production",
      icon: <TrendingUp className="h-6 w-6" />,
      duration: "1-2 weeks"
    },
    {
      step: 5,
      title: "Deployment & Training",
      description: "Go-live support with comprehensive team training",
      icon: <Users className="h-6 w-6" />,
      duration: "1 week"
    },
    {
      step: 6,
      title: "Ongoing Support",
      description: "Continuous monitoring, optimization, and enhancement",
      icon: <Zap className="h-6 w-6" />,
      duration: "Ongoing"
    }
  ];

  const industries = [
    {
      name: "Healthcare",
      icon: "🏥",
      challenges: [
        "HIPAA compliance requirements",
        "Sensitive patient data processing",
        "Real-time diagnostic support"
      ],
      solutions: [
        "On-premise AI for medical imaging",
        "Privacy-preserving patient analytics",
        "Automated clinical documentation"
      ]
    },
    {
      name: "Education",
      icon: "🎓",
      challenges: [
        "Personalized learning at scale",
        "Student data privacy",
        "Administrative automation"
      ],
      solutions: [
        "Local AI tutoring systems",
        "Automated grading & feedback",
        "Student progress analytics"
      ]
    },
    {
      name: "Finance",
      icon: "💰",
      challenges: [
        "Regulatory compliance",
        "Fraud detection",
        "Customer data protection"
      ],
      solutions: [
        "Local fraud detection models",
        "Automated compliance reporting",
        "Secure customer analytics"
      ]
    },
    {
      name: "Manufacturing",
      icon: "🏭",
      challenges: [
        "Predictive maintenance",
        "Quality control automation",
        "Supply chain optimization"
      ],
      solutions: [
        "Edge AI for equipment monitoring",
        "Computer vision quality control",
        "Intelligent inventory management"
      ]
    }
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
              <Card className={`bg-gradient-to-br from-slate-900/80 to-black/60 backdrop-blur-sm border-white/10 hover:border-${service.color}-400/30 transition-all duration-300 h-full`}>
                <div className="p-8">
                  {/* Service Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${service.color}-400 to-${service.color}-600 flex items-center justify-center text-white shadow-lg shadow-${service.color}-400/25`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{service.name}</h3>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Pricing & Duration */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="outline" className={`text-${service.color}-400 border-${service.color}-400/30`}>
                      {service.pricing}
                    </Badge>
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
                          <CheckCircle className={`h-4 w-4 text-${service.color}-400 flex-shrink-0 mt-0.5`} />
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
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span className="text-gray-300 text-sm">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="outline" 
                    className={`w-full border-${service.color}-400/30 text-${service.color}-400 hover:bg-${service.color}-400/10`}
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

        {/* Workflow Process */}
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
              Our Proven Process
            </h3>
            <p className="text-gray-300 text-lg">
              From discovery to deployment - a systematic approach to AI transformation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="relative"
              >
                <Card className="bg-black/40 backdrop-blur-sm border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-600 flex items-center justify-center text-black font-bold">
                  {step.step}
                </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-gray-300 text-sm mb-3">{step.description}</p>
                    <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                      {step.duration}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry Applications */}
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
              Industry Solutions
            </h3>
            <p className="text-gray-300 text-lg">
              Tailored AI solutions for your specific industry challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-slate-900/80 to-black/60 backdrop-blur-sm border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{industry.icon}</span>
                      <h4 className="text-xl font-semibold text-white">{industry.name}</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-white font-medium mb-2">Challenges</h5>
                        <div className="space-y-1">
                          {industry.challenges.map((challenge, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{challenge}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-white font-medium mb-2">Our Solutions</h5>
                        <div className="space-y-1">
                          {industry.solutions.map((solution, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                              <span className="text-gray-300 text-sm">{solution}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
              <Building className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
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