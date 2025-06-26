"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Calculator, 
  Users, 
  Shield, 
  Cloud, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Database,
  MessageSquare,
  DollarSign,
  Clock,
  TrendingUp,
  Lock,
  Cpu,
  Bot
} from "lucide-react";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { ShineBorder } from "@/components/magicui/shine-border";
import WorkflowsCarousel from "./WorkflowsCarousel";
import Link from "next/link";

export default function Services() {
  /* Quick Wins Data */
  const quickWins = [
    {
      icon: Mail,
      title: "AI Email Agent",
      subtitle: "Intelligent Email Automation",
      description: "Deploy an AI agent that handles customer emails, support tickets, and internal communications 24/7. Automatically categorizes, responds, and escalates based on your business rules.",
      features: [
        "Auto-respond to 80% of customer inquiries",
        "Smart email categorization and routing",
        "Context-aware responses using company knowledge",
        "Seamless handoff to human agents when needed"
      ],
      roi: "Save 15-20 hours/week per team member",
      timeToValue: "Deploy in 2-3 days",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderGradient: "from-blue-500/50 to-cyan-500/50"
    },
    {
      icon: Calculator,
      title: "Smart Financial Hub",
      subtitle: "Invoice & Cost Intelligence",
      description: "Connect to your company databases, ERP systems, and financial tools to get real-time cost estimates, invoice processing, and financial insights through a single AI-powered admin interface.",
      features: [
        "Automated invoice processing and approval workflows",
        "Real-time cost estimation based on company algorithms",
        "Integration with stocks, inventory, and pricing data",
        "Unified dashboard for all financial operations"
      ],
      roi: "Reduce processing time by 75%",
      timeToValue: "Live in 1-2 weeks",
      gradient: "from-emerald-500/20 to-teal-500/20",
      borderGradient: "from-emerald-500/50 to-teal-500/50"
    },
    {
      icon: Users,
      title: "Meeting Intelligence",
      subtitle: "Automated Meeting Analysis",
      description: "Transform every meeting into actionable insights. Our AI attends meetings, generates summaries, extracts action items, and automatically updates project management tools.",
      features: [
        "Real-time meeting transcription and analysis",
        "Automatic action item extraction and assignment",
        "Meeting summaries sent to stakeholders instantly",
        "Integration with project management tools"
      ],
      roi: "Reclaim 5-8 hours/week per manager",
      timeToValue: "Start using today",
      gradient: "from-purple-500/20 to-pink-500/20",
      borderGradient: "from-purple-500/50 to-pink-500/50"
    }
  ];

  const deploymentOptions = [
    {
      icon: Lock,
      title: "Private Cloud",
      description: "Complete on-premise deployment with full data sovereignty",
      features: ["Your infrastructure", "Zero data sharing", "Custom security protocols"],
      ideal: "Enterprise & regulated industries"
    },
    {
      icon: Shield,
      title: "Hybrid Setup",
      description: "Best of both worlds - sensitive data stays local, AI processing in secure cloud",
      features: ["Selective data processing", "Enhanced performance", "Scalable architecture"],
      ideal: "Growing businesses"
    },
    {
      icon: Cloud,
      title: "Managed Cloud",
      description: "Fully managed AI automation with enterprise-grade security",
      features: ["Zero maintenance", "Auto-scaling", "24/7 monitoring"],
      ideal: "Fast deployment needs"
    }
  ];

  const businessImpact = [
    {
      metric: "80%",
      label: "Reduction in manual tasks",
      icon: Clock
    },
    {
      metric: "2-5x",
      label: "Faster decision making",
      icon: Zap
    },
    {
      metric: "90%",
      label: "Accuracy in data processing",
      icon: CheckCircle
    },
    {
      metric: "24/7",
      label: "Automated operations",
      icon: TrendingUp
    }
  ];

  /* Animation helper */
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // New shine animation for important elements
interface ShineEffectProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const ShineEffect: React.FC<ShineEffectProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ x: '-100%', opacity: 0.5 }}
        animate={{ 
          x: '200%', 
          opacity: 0.8,
          transition: { 
            repeat: Infinity, 
            duration: 2.5, 
            ease: "easeInOut",
            delay,
            repeatDelay: 7
          }
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          zIndex: 2
        }}
      />
      {children}
    </div>
  );
};

  return (
    <section className="relative w-full text-white overflow-hidden">
      <div className="container mx-auto px-4 py-20 space-y-24">
        
        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center max-w-5xl mx-auto space-y-8"
        >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-white/20 text-sm font-medium">
          <Zap className="w-4 h-4 text-amber-400" />
          Quick Wins for Enterprise Automation
        </div>
          
          <ShineEffect delay={0.5}>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Transform Your Business
              <br />
              <span className="text-4xl md:text-6xl">in Days, Not Months</span>
            </h1>
          </ShineEffect>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Stop waiting for digital transformation. Deploy AI agents that solve your biggest pain points immediately - from email automation to financial intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <ShineEffect>
              <Button asChild size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-white/90 via-gray-200/90 to-gray-400/90 text-black hover:from-white hover:via-white hover:to-gray-300 shadow-lg shadow-white/10">
                <Link href="/contact" className="flex items-center gap-2">
                  Get Your Quick Win Demo
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </Link>
              </Button>
            </ShineEffect>
            <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300">
              <Link href="/ai-tools" className="flex items-center gap-2">
                Explore AI Tools
                <ArrowRight className="w-4 h-4 text-purple-400" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Business Impact Metrics */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {businessImpact.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="text-center space-y-3 group"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-white/5 group-hover:scale-110 transition-transform duration-300">
                <item.icon className={`w-8 h-8 ${
                  index === 0 ? "text-rose-400" : 
                  index === 1 ? "text-amber-400" : 
                  index === 2 ? "text-emerald-400" :
                  "text-sky-400"
                }`} />
              </div>
              <ShineEffect delay={index * 0.3}>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">{item.metric}</div>
              </ShineEffect>
              <div className="text-sm text-gray-400">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Wins Section */}
        <div className="space-y-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center space-y-4"
          >
            <ShineEffect>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Your <span>Quick Wins</span>
              </h2>
            </ShineEffect>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three game-changing AI solutions that deliver immediate ROI for any business
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="space-y-12"
          >
            {quickWins.map((win, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="relative group"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={16}
                />
                <div className="relative overflow-hidden rounded-2xl bg-transparent border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/5 hover:bg-white/10 group-hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg shadow-white/5">
                            <win.icon className={`w-8 h-8 ${
                              index === 0 ? "text-sky-400" : 
                              index === 1 ? "text-emerald-400" : 
                              "text-violet-400"
                            }`} />
                          </div>
                          <div>
                            <ShineEffect delay={index * 0.3}>
                              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">{win.title}</h3>
                            </ShineEffect>
                            <p className="text-gray-300 font-medium">{win.subtitle}</p>
                          </div>
                        </div>
                        
                        <p className="text-lg text-gray-200 leading-relaxed">
                          {win.description}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent border border-white/10">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-medium text-gray-100">{win.roi}</span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent border border-white/10">
                            <Clock className="w-4 h-4 text-indigo-400" />
                            <span className="text-sm font-medium text-gray-100">{win.timeToValue}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">Key Capabilities:</h4>
                        <div className="space-y-3">
                          {win.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-cyan-300 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-200">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <ShineEffect delay={index * 0.3 + 0.3}>
                          <Button 
                            asChild 
                            className="w-full mt-6 bg-gradient-to-r from-white/90 via-gray-200/90 to-gray-400/90 hover:from-white hover:via-white hover:to-gray-300 text-black font-semibold shadow-lg shadow-white/10"
                          >
                            <Link href="/contact" className="flex items-center justify-center gap-2">
                              Get Started <ArrowRight className="w-4 h-4 text-cyan-400" />
                            </Link>
                          </Button>
                        </ShineEffect>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interactive Workflow Demonstrations */}
        <div className="space-y-12">
          <motion.div
          initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center space-y-4"
          >
            <ShineEffect delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                See It <span>In Action</span>
              </h2>
            </ShineEffect>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Interactive workflow demonstrations showing exactly how your business processes get automated
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <WorkflowsCarousel />
          </motion.div>
        </div>

        {/* Deployment Options */}
        <div className="space-y-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center space-y-4"
          >
            <ShineEffect delay={0.3}>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Deploy <span>Your Way</span>
              </h2>
            </ShineEffect>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From completely private to fully managed - choose the deployment that fits your security and operational needs
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {deploymentOptions.map((option, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="relative group"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={18}
                />
                <Card className="relative h-full p-8 bg-transparent border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-white/5 hover:bg-white/10 group-hover:scale-[1.02]">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                                              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-white/5">
                          <option.icon className={`w-6 h-6 ${
                            index === 0 ? "text-violet-400" : 
                            index === 1 ? "text-sky-400" : 
                            "text-amber-400"
                          }`} />
                        </div>
                      <ShineEffect delay={index * 0.2}>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">{option.title}</h3>
                      </ShineEffect>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">{option.description}</p>
                    
                    <div className="space-y-2">
                      {option.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-cyan-300" />
                          <span className="text-sm text-gray-200">{feature}</span>
                        </div>
                      ))}
                      </div>
              
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-sm text-gray-300 font-medium">Ideal for: <span className="text-white">{option.ideal}</span></div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          className="text-center space-y-8 pt-12"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <ShineEffect delay={0.4} className="mb-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Ready to See Your <span>Quick Win</span>?
              </h2>
            </ShineEffect>
            <p className="text-xl text-gray-300">
              Book a 30-minute demo and see how AI can transform your specific business processes. 
              We'll show you exactly how to implement your first automation this week.
            </p>
        </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ShineEffect delay={0.5}>
              <Button asChild size="lg" className="px-10 py-5 text-lg font-semibold bg-gradient-to-r from-white/90 via-gray-200/90 to-gray-400/90 hover:from-white hover:via-white hover:to-gray-300 text-black shadow-lg shadow-white/10">
                <Link href="/contact" className="flex items-center gap-2">
                  Schedule Your Demo
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </Link>
              </Button>
            </ShineEffect>
            <Button asChild variant="outline" size="lg" className="px-10 py-5 text-lg font-semibold border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300">
              <Link href="/ai-tools" className="flex items-center gap-2">
                Browse AI Tools
                <ArrowRight className="w-5 h-5 text-purple-400" />
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              No long-term contracts
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              Results in days
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-sky-400" />
              Your data stays secure
        </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 