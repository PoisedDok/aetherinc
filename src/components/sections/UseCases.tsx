"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  Factory,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export default function UseCases() {
  const useCasesRef = useRef<HTMLElement | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState('enterprise');

  // Case studies data
  const caseStudies = {
    enterprise: {
      title: "Acme Corp Improves Security & Efficiency",
      description: "Acme implemented GURU devices for their sales team, enabling secure customer data processing without cloud connectivity. Result: 42% faster customer service response times while maintaining strict data privacy compliance.",
      stats: [
        { label: "Faster Response", value: "42%" },
        { label: "Data Breaches", value: "0" },
        { label: "ROI", value: "389%" }
      ],
      icon: <Building2 className="h-8 w-8 text-cyan-400" />
    },
    healthcare: {
      title: "Memorial Hospital Enhances Patient Privacy",
      description: "Memorial Hospital deployed GURU units in their diagnostic department to process patient data locally. Result: Maintained HIPAA compliance while improving diagnostic speed by 37% and reducing cloud infrastructure costs by 61%.",
      stats: [
        { label: "HIPAA Compliant", value: "100%" },
        { label: "Faster Diagnostics", value: "37%" },
        { label: "Cost Reduction", value: "61%" }
      ],
      icon: <Stethoscope className="h-8 w-8 text-cyan-400" />
    },
    education: {
      title: "State University Research Breakthrough",
      description: "The State University research department used GURU to process sensitive genomic data without exposing it to third-party cloud services. Result: Research accelerated by 58% while ensuring complete data sovereignty.",
      stats: [
        { label: "Research Speed", value: "+58%" },
        { label: "Data Protected", value: "100%" },
        { label: "Grant Funding", value: "+$2.4M" }
      ],
      icon: <GraduationCap className="h-8 w-8 text-cyan-400" />
    },
    manufacturing: {
      title: "Global Manufacturing Plant Optimization",
      description: "A global manufacturing company deployed GURU devices on their factory floor to process sensor data in real-time without internet connectivity. Result: 23% reduction in downtime and 18% increase in overall equipment effectiveness.",
      stats: [
        { label: "Reduced Downtime", value: "23%" },
        { label: "OEE Improvement", value: "18%" },
        { label: "Annual Savings", value: "$3.2M" }
      ],
      icon: <Factory className="h-8 w-8 text-cyan-400" />
    }
  };

  return (
    <section 
      ref={useCasesRef}
      id="use-cases"
      className="relative py-24 bg-gradient-to-br from-indigo-950 via-slate-950 to-indigo-950"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            Real-World Applications
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            See how organizations are leveraging GURU's edge AI capabilities to transform their operations.
          </motion.p>
        </div>

        {/* Industry Selector and Case Study Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Industry Selection */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Industries</h3>
            
            <IndustryButton 
              active={activeCaseStudy === 'enterprise'} 
              onClick={() => setActiveCaseStudy('enterprise')}
              icon={<Building2 className="h-6 w-6" />}
              label="Enterprise"
            />
            
            <IndustryButton 
              active={activeCaseStudy === 'healthcare'} 
              onClick={() => setActiveCaseStudy('healthcare')}
              icon={<Stethoscope className="h-6 w-6" />}
              label="Healthcare"
            />
            
            <IndustryButton 
              active={activeCaseStudy === 'education'} 
              onClick={() => setActiveCaseStudy('education')}
              icon={<GraduationCap className="h-6 w-6" />}
              label="Education"
            />
            
            <IndustryButton 
              active={activeCaseStudy === 'manufacturing'} 
              onClick={() => setActiveCaseStudy('manufacturing')}
              icon={<Factory className="h-6 w-6" />}
              label="Manufacturing"
            />
          </div>
          
          {/* Case Study Display */}
          <motion.div 
            key={activeCaseStudy}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <Card className="bg-slate-800/50 border-none shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-1">
                  <div className="bg-slate-900/80 p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-cyan-500/30 to-blue-500/30 p-3 rounded-lg">
                        {caseStudies[activeCaseStudy as keyof typeof caseStudies].icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {caseStudies[activeCaseStudy as keyof typeof caseStudies].title}
                        </h3>
                        <div className="text-gray-300 mb-6">
                          {caseStudies[activeCaseStudy as keyof typeof caseStudies].description}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          {caseStudies[activeCaseStudy as keyof typeof caseStudies].stats.map((stat, i) => (
                            <div key={i} className="bg-slate-800/80 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                              <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Benefits */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Why Organizations Choose GURU</h3>
            <p className="text-gray-400">The competitive advantages of on-device AI processing</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BenefitItem
              title="Complete Data Privacy"
              description="Keep sensitive information on-device, eliminating data exposure to third-party cloud services."
            />
            <BenefitItem
              title="Reduced Operational Costs"
              description="Eliminate ongoing cloud computing expenses and reduce bandwidth requirements."
            />
            <BenefitItem
              title="Enhanced Performance"
              description="Process data in real-time with low latency, ideal for time-sensitive applications."
            />
            <BenefitItem
              title="Regulatory Compliance"
              description="Meet stringent data protection regulations like GDPR, HIPAA, and CCPA with ease."
            />
            <BenefitItem
              title="Offline Functionality"
              description="Continue operations without internet connectivity, perfect for remote locations."
            />
            <BenefitItem
              title="Customizable Solutions"
              description="Adapt GURU to your specific industry needs with our flexible API and SDK."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Industry selection button
interface IndustryButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const IndustryButton = ({ active, onClick, icon, label }: IndustryButtonProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-300 ${
      active 
        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' 
        : 'bg-slate-800/30 hover:bg-slate-800/50 border border-transparent'
    }`}
  >
    <div className={`${active ? 'text-cyan-400' : 'text-gray-400'}`}>
      {icon}
    </div>
    <span className={`${active ? 'text-white' : 'text-gray-300'} font-medium`}>{label}</span>
    {active && (
      <div className="ml-auto">
        <CheckCircle2 className="h-5 w-5 text-cyan-400" />
      </div>
    )}
  </button>
);

// Benefit item component
const BenefitItem = ({ title, description }: { title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors duration-300"
  >
    <div className="flex items-start gap-3">
      <div className="mt-1">
        <CheckCircle2 className="h-5 w-5 text-cyan-400" />
      </div>
      <div>
        <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  </motion.div>
); 