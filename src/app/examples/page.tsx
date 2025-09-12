"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BackToTop } from '@/components/ui/back-to-top';
import {
  FileText,
  Search,
  Eye,
  BookOpen,
  CheckCircle,
  Gavel,
  Shield,
  ArrowRight,
  Filter,
  X,
  Users,
  Building,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { ShineBorder } from '@/components/magicui/shine-border';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Filter categories
const filterCategories = {
  industry: [
    { id: 'corporate', label: 'Corporate Law', icon: Building },
    { id: 'litigation', label: 'Litigation', icon: Gavel },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'real-estate', label: 'Real Estate', icon: Building },
    { id: 'intellectual-property', label: 'IP Law', icon: FileText }
  ],
  documentType: [
    { id: 'contracts', label: 'Contracts', icon: FileText },
    { id: 'discovery', label: 'Discovery Docs', icon: Search },
    { id: 'court-filings', label: 'Court Filings', icon: Gavel },
    { id: 'policies', label: 'Policies', icon: CheckCircle },
    { id: 'research', label: 'Research', icon: BookOpen }
  ],
  useCase: [
    { id: 'due-diligence', label: 'Due Diligence', icon: Search },
    { id: 'risk-assessment', label: 'Risk Assessment', icon: Shield },
    { id: 'document-review', label: 'Document Review', icon: Eye },
    { id: 'compliance-check', label: 'Compliance Check', icon: CheckCircle },
    { id: 'legal-research', label: 'Legal Research', icon: BookOpen }
  ]
};

// Practical use case scenarios
const exampleScenarios = [
  {
    title: "M&A Due Diligence Automation",
    description: "Streamline complex merger and acquisition reviews by automatically processing 500+ page acquisition agreements to extract key terms, obligations, and risk factors.",
    scenario: "A tech startup acquisition involving complex IP assignments, earn-out provisions, and regulatory approvals.",
    process: "AI analyzes document structure, identifies key clauses, extracts dates and obligations, and flags potential risks.",
    capabilities: [
      "Automatic clause identification",
      "Key term extraction",
      "Risk factor highlighting",
      "Document structure analysis"
    ],
    icon: <FileText className="h-8 w-8 text-blue-400" />,
    tags: ["Contract Analysis", "Risk Assessment", "Due Diligence"],
    demoType: "Contract Review Workflow",
    industry: ['corporate'],
    documentType: ['contracts'],
    useCase: ['due-diligence', 'risk-assessment'],
    persona: "Corporate Counsel",
    timeSaved: "85%",
    successMetric: "Could identify 12 critical risks missed by manual review",
    beforeAfter: {
      before: "Manual review of 500 pages takes 3 days, costing $12,000 in attorney time",
      after: "AI can process in 15 minutes with comprehensive risk analysis"
    },
    testimonial: "\"AI can catch risks that might be missed, potentially saving from significant liability exposure.\" - Legal Technology Analysis"
  },
  {
    title: "Discovery Review at Scale",
    description: "Efficiently manage large-scale document reviews in complex litigation by automatically identifying relevant evidence while protecting privileged content.",
    scenario: "High-stakes employment discrimination case with massive document production requiring rapid review.",
    process: "AI scans content for keywords, ranks documents by relevance (95% accuracy), identifies privileged material, and generates review summaries.",
    capabilities: [
      "Content scanning and analysis",
      "Relevance ranking (95% accuracy)",
      "Privilege detection",
      "Automated summaries"
    ],
    icon: <Search className="h-8 w-8 text-green-400" />,
    tags: ["Document Review", "Evidence", "Privilege Protection"],
    demoType: "Large-Scale Review Workflow",
    industry: ['litigation'],
    documentType: ['discovery'],
    useCase: ['document-review'],
    persona: "Litigation Partner",
    timeSaved: "92%",
    successMetric: "Could review 50,000 documents in 2 days instead of 6 months manually",
    beforeAfter: {
      before: "6-month document review costing $500K+ in associate time",
      after: "2-day AI review with 95% accuracy and full privilege protection"
    },
    testimonial: "\"AI can uncover evidence that might be overlooked, potentially leading to better settlement outcomes.\" - Litigation Technology Review"
  },
  {
    title: "GDPR Compliance Redaction",
    description: "Automatically identify and redact sensitive PII across large document sets while preserving legal formatting and maintaining compliance standards.",
    scenario: "International data breach litigation requiring redaction of personal data across multiple jurisdictions.",
    process: "AI detects PII using advanced ML, applies intelligent redactions, maintains document integrity, and creates detailed audit trails.",
    capabilities: [
      "PII detection and redaction",
      "Format preservation",
      "Audit trail generation",
      "Compliance documentation"
    ],
    icon: <Eye className="h-8 w-8 text-purple-400" />,
    tags: ["Privacy", "Redaction", "Compliance"],
    demoType: "Data Privacy Workflow",
    industry: ['compliance', 'litigation'],
    documentType: ['contracts', 'discovery'],
    useCase: ['compliance-check'],
    persona: "Privacy Officer",
    timeSaved: "95%",
    successMetric: "Could help achieve zero GDPR violations in compliance matters",
    beforeAfter: {
      before: "Manual redaction errors can lead to $1.2M in fines",
      after: "100% accurate automated redaction with full audit trails"
    },
    testimonial: "\"Automated redaction can help avoid catastrophic GDPR fines through improved accuracy.\" - Privacy Compliance Analysis"
  },
  {
    title: "Supreme Court Brief Research",
    description: "Analyze extensive case law databases to identify winning precedents and craft compelling legal arguments for appellate work.",
    scenario: "Constitutional challenge requiring analysis of 50 years of Supreme Court precedent and lower court decisions.",
    process: "AI searches legal databases, analyzes case patterns, extracts relevant holdings, and generates research summaries with citation confidence scores.",
    capabilities: [
      "Case law analysis",
      "Pattern recognition",
      "Citation extraction with confidence scores",
      "Research synthesis"
    ],
    icon: <BookOpen className="h-8 w-8 text-yellow-400" />,
    tags: ["Legal Research", "Case Analysis", "Precedent Review"],
    demoType: "Legal Research Workflow",
    industry: ['litigation'],
    documentType: ['research'],
    useCase: ['legal-research'],
    persona: "Appellate Attorney",
    timeSaved: "80%",
    successMetric: "Could help win more appeals through comprehensive research",
    beforeAfter: {
      before: "3-week research process costing $25K in attorney time",
      after: "3-hour AI research with comprehensive precedent analysis"
    },
    testimonial: "\"AI can identify precedents that might be missed, potentially improving appellate success rates.\" - Appellate Practice Review"
  },
  {
    title: "Federal Court Filing Compliance",
    description: "Ensure perfect compliance with federal court rules and formatting requirements through automated validation of complex legal filings.",
    scenario: "Emergency injunction filing requiring perfect compliance with Federal Rules of Civil Procedure and local court rules.",
    process: "AI checks documents against court rules, validates formatting, verifies citations, and flags compliance issues with specific rule references.",
    capabilities: [
      "Rule compliance checking",
      "Format validation",
      "Citation verification",
      "Issue identification with rule citations"
    ],
    icon: <Gavel className="h-8 w-8 text-red-400" />,
    tags: ["Court Filing", "Compliance", "Document Validation"],
    demoType: "Court Filing Workflow",
    industry: ['litigation'],
    documentType: ['court-filings'],
    useCase: ['compliance-check'],
    persona: "Litigation Associate",
    timeSaved: "90%",
    successMetric: "Could help achieve zero filing rejections in federal cases",
    beforeAfter: {
      before: "Rejected filings cost $5K+ in refiling fees and delays",
      after: "100% first-time filing success with instant compliance verification"
    },
    testimonial: "\"AI can catch formatting errors before filing, helping avoid costly rejections.\" - Federal Court Practice Analysis"
  },
  {
    title: "Continuous Compliance Monitoring",
    description: "Monitor policy documents and regulatory requirements continuously to identify changes and ensure ongoing compliance across the organization.",
    scenario: "Fortune 500 company's compliance program requiring monitoring of SEC, SOX, and industry-specific regulations.",
    process: "AI reviews policy documents, identifies compliance gaps, tracks regulatory changes, and generates prioritized update recommendations.",
    capabilities: [
      "Policy analysis",
      "Compliance gap detection",
      "Change tracking",
      "Prioritized recommendations"
    ],
    icon: <CheckCircle className="h-8 w-8 text-cyan-400" />,
    tags: ["Compliance Monitoring", "Risk Assessment", "Policy Review"],
    demoType: "Compliance Monitoring Workflow",
    industry: ['compliance', 'corporate'],
    documentType: ['policies'],
    useCase: ['compliance-check', 'risk-assessment'],
    persona: "Chief Compliance Officer",
    timeSaved: "88%",
    successMetric: "Could identify regulatory changes requiring policy updates",
    beforeAfter: {
      before: "Manual quarterly reviews might miss critical regulatory updates",
      after: "Real-time monitoring with instant alerts for compliance gaps"
    },
    testimonial: "\"AI can catch regulatory changes early, potentially saving significant fines.\" - Compliance Program Analysis"
  }
];



export default function ExamplesPage() {
  const [activeFilters, setActiveFilters] = useState<{
    industry: string[];
    documentType: string[];
    useCase: string[];
  }>({
    industry: [],
    documentType: [],
    useCase: []
  });

  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter examples based on active filters
  const filteredExamples = useMemo(() => {
    if (!activeFilters.industry.length && !activeFilters.documentType.length && !activeFilters.useCase.length) {
      return exampleScenarios;
    }

    return exampleScenarios.filter(example => {
      const industryMatch = !activeFilters.industry.length || activeFilters.industry.some(filter => example.industry.includes(filter));
      const documentTypeMatch = !activeFilters.documentType.length || activeFilters.documentType.some(filter => example.documentType.includes(filter));
      const useCaseMatch = !activeFilters.useCase.length || activeFilters.useCase.some(filter => example.useCase.includes(filter));

      return industryMatch && documentTypeMatch && useCaseMatch;
    });
  }, [activeFilters]);

  const toggleFilter = (category: keyof typeof activeFilters, filterId: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(filterId)
        ? prev[category].filter(id => id !== filterId)
        : [...prev[category], filterId]
    }));
  };

  const clearFilters = () => {
    setActiveFilters({ industry: [], documentType: [], useCase: [] });
  };

  const activeFilterCount = Object.values(activeFilters).reduce((acc, filters) => acc + filters.length, 0);

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

  return (
    <div className="min-h-screen text-white relative">
      <ScrollProgress />
      <BackToTop />
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20 px-4 md:px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 max-w-5xl mx-auto"
        >
          <div className="mb-6 inline-block">
            <div className="relative">
              <ShineBorder 
                className="absolute inset-0 rounded-full" 
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                duration={12}
              />
              <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-black/30">
                <TrendingUp className="w-4 h-4 mr-2" />
                Practical Use Cases
              </Badge>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white">
            Practical Use Cases
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Explore real-world applications of AI in legal document processing. See how intelligent automation transforms complex legal workflows across different practice areas and document types.
          </p>
        </motion.div>

        {/* Interactive Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="bg-white/5 border-white/20 hover:bg-white/10 text-white"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-2 bg-blue-500 text-white text-xs">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>

              {activeFilterCount > 0 && (
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear all
                </Button>
              )}
            </div>

            <div className="text-gray-400 text-sm">
              Showing {filteredExamples.length} of {exampleScenarios.length} examples
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Card className="bg-white/5 border-white/10 p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Industry Filters */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        Legal Practice Area
                      </h4>
                      <div className="space-y-2">
                        {filterCategories.industry.map(filter => {
                          const Icon = filter.icon;
                          const isActive = activeFilters.industry.includes(filter.id);
                          return (
                            <button
                              key={filter.id}
                              onClick={() => toggleFilter('industry', filter.id)}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center text-sm",
                                isActive
                                  ? "bg-blue-500/20 border border-blue-400/50 text-blue-300"
                                  : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                              )}
                            >
                              <Icon className="w-3 h-3 mr-2" />
                              {filter.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Document Type Filters */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Document Type
                      </h4>
                      <div className="space-y-2">
                        {filterCategories.documentType.map(filter => {
                          const Icon = filter.icon;
                          const isActive = activeFilters.documentType.includes(filter.id);
                          return (
                            <button
                              key={filter.id}
                              onClick={() => toggleFilter('documentType', filter.id)}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center text-sm",
                                isActive
                                  ? "bg-green-500/20 border border-green-400/50 text-green-300"
                                  : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                              )}
                            >
                              <Icon className="w-3 h-3 mr-2" />
                              {filter.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Use Case Filters */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Use Case
                      </h4>
                      <div className="space-y-2">
                        {filterCategories.useCase.map(filter => {
                          const Icon = filter.icon;
                          const isActive = activeFilters.useCase.includes(filter.id);
                          return (
                            <button
                              key={filter.id}
                              onClick={() => toggleFilter('useCase', filter.id)}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center text-sm",
                                isActive
                                  ? "bg-purple-500/20 border border-purple-400/50 text-purple-300"
                                  : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                              )}
                            >
                              <Icon className="w-3 h-3 mr-2" />
                              {filter.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Examples Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
        >
          {filteredExamples.map((example, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="relative group"
            >
              <ShineBorder 
                className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                duration={15 + index * 2}
              />
              <Card className="relative h-full p-8 bg-transparent border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-white/5 hover:bg-white/5 hover:shadow-white/10 group-hover:scale-[1.01]">
                <div className="flex flex-col h-full space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-grow">
                    <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-white/5 flex-shrink-0 group-hover:bg-white/15 transition-all duration-300">
                      {example.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-white group-hover:text-gray-100 mb-2 transition-all duration-300">{example.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                            <Users className="w-3 h-3 mr-1" />
                            {example.persona}
                          </Badge>
                          <Badge variant="outline" className="text-xs text-green-400 border-green-600">
                            <Clock className="w-3 h-3 mr-1" />
                            {example.timeSaved} faster
                          </Badge>
                        </div>
                      <p className="text-gray-400 group-hover:text-gray-300 text-sm transition-all duration-300">{example.demoType}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed transition-all duration-300">{example.description}</p>

                  {/* Success Metric */}
                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-semibold text-sm">Success Metric</span>
                    </div>
                    <p className="text-white text-sm font-medium">{example.successMetric}</p>
                  </div>

                  {/* Before/After Comparison */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold text-sm flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Before vs After
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                        <div className="text-red-400 text-xs font-semibold mb-1">BEFORE</div>
                        <p className="text-gray-300 text-sm">{example.beforeAfter.before}</p>
                      </div>
                      <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="text-green-400 text-xs font-semibold mb-1">AFTER with GURU</div>
                        <p className="text-gray-300 text-sm">{example.beforeAfter.after}</p>
                      </div>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold text-sm">Key Capabilities:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {example.capabilities.map((capability, capabilityIndex) => (
                        <div key={capabilityIndex} className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-300">
                          <CheckCircle className="h-3 w-3 text-green-400 group-hover:text-green-300 mr-2 flex-shrink-0 transition-all duration-300" />
                          {capability}
                        </div>
                      ))}
                    </div>
                  </div>


                  {/* Interactive CTA */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedExample(selectedExample === index ? null : index)}
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-white/5 border-white/20 hover:bg-white/10 text-white"
                    >
                      {selectedExample === index ? 'Hide Details' : 'View Details'}
                        </Button>
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {selectedExample === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pt-4 border-t border-white/10">
                          <div className="space-y-2">
                            <h4 className="text-white font-semibold text-sm">Real-World Scenario:</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{example.scenario}</p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-white font-semibold text-sm">How AI Processes This:</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{example.process}</p>
                          </div>

                  <div className="flex flex-wrap gap-2">
                    {example.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs text-gray-400 border-gray-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Legal Workflow?
          </h2>
          <p className="text-lg text-gray-400 mb-12 leading-relaxed">
            Experience how AI can revolutionize your legal document processing. See practical applications that deliver real results with complete privacy and professional accuracy.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                <Link href="/contact">
                  Book a Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
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
                asChild
                className="relative w-full sm:w-auto bg-black/30 hover:bg-black/50 text-white border border-white/30 font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 text-base h-auto backdrop-blur-md min-w-[220px] sm:min-w-[220px] transform hover:scale-105"
                size="lg"
              >
                <Link href="/legal">Explore Features</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />

    </div>
  );
}