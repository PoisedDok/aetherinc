"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShineBorder } from '@/components/magicui/shine-border';
import {
  Check,
  X,
  Shield,
  FileText,
  Users,
  Building,
  Zap,
  Cpu,
  Server,
  Clock,
  Calculator,
  ArrowRight,
  Sparkles,
  Lock,
  Eye
} from 'lucide-react';
import Link from 'next/link';

interface PricingTier {
  name: string;
  price: string;
  subtitle: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonLink: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Solo Practitioner",
    price: "From £5,000",
    subtitle: "Complete solution for solo lawyers",
    description: "Essential GURU AI solution with base license, certified hardware, and monthly support for independent practitioners.",
    features: [
      "GURU AI Software License (£5,000)",
      "Certified Hardware Appliance",
      "Base OCR + VLM Models",
      "Confidence Scoring & Monthly Updates",
      "Basic Handwriting Support",
      "Professional Setup (£3,000)"
    ],
    buttonText: "Get Started",
    buttonLink: "/contact"
  },
  {
    name: "Small Firm",
    price: "From £15,000",
    subtitle: "Growing firms (2-15 lawyers)",
    description: "Professional GURU AI deployment for small to medium firms with essential add-ons and comprehensive implementation.",
    features: [
      "GURU AI Software License (£15,000)",
      "24-Month Hardware Lease",
      "Base OCR + VLM Models",
      "Handwriting Pro (£2,000)",
      "Tables & Forms (£3,000)",
      "Implementation (£8,000)"
    ],
    buttonText: "Schedule Demo",
    buttonLink: "/contact"
  },
  {
    name: "Medium Firm",
    price: "From £30,000",
    subtitle: "Established firms (15-60 lawyers)",
    description: "Complete enterprise GURU AI solution for medium-sized firms with advanced features and dedicated support.",
    features: [
      "GURU AI Software License (£30,000)",
      "36-Month Hardware Lease",
      "Base OCR + VLM Models",
      "Evidence Assembly (£4,000)",
      "Priority Support",
      "Services (£15,000)"
    ],
    buttonText: "Schedule Demo",
    buttonLink: "/contact"
  },
  {
    name: "Large Firm",
    price: "From £45,000",
    subtitle: "High-volume practices (60-150 lawyers)",
    description: "Advanced GURU AI solution for large litigation practices with comprehensive document processing and evidence management.",
    features: [
      "GURU AI Software License (£45,000)",
      "36-Month Hardware Lease",
      "Base OCR + VLM Models",
      "All Add-Ons (£9,000)",
      "Redaction & Chain Tracking",
      "Services (£25,000)"
    ],
    buttonText: "Contact Sales",
    buttonLink: "/contact"
  }
];

const additionalServices = [
  {
    name: "Enterprise Flexible",
    description: "Customizable enterprise solution for 150-300 lawyers",
    price: "From £80,000",
    features: [
      "Multi-Appliance License (2 sites)",
      "Asset-Backed Hardware Financing",
      "All Add-On Modules (£9,000)",
      "Custom Implementation (£35,000)",
      "Dedicated Success Manager",
      "24/7 Priority Support",
      "Quarterly AI Model Updates"
    ]
  },
  {
    name: "Enterprise Comprehensive",
    description: "Full enterprise suite for 250-400 lawyers",
    price: "From £120,000",
    features: [
      "Multi-Appliance License (3 sites)",
      "Complete Enterprise Infrastructure",
      "All Add-On Modules (£16,000)",
      "Comprehensive Implementation (£45,000)",
      "Advanced AI Model Customization",
      "Multi-Language Support",
      "Custom Integration APIs"
    ]
  },
  {
    name: "Global Enterprise",
    description: "Worldwide deployment for 400+ lawyers",
    price: "From £200,000",
    features: [
      "Unlimited Appliance Licenses",
      "Global Infrastructure Deployment",
      "All Add-On Modules (per site)",
      "Global Rollout Services (£75,000)",
      "Multi-Site Management",
      "Advanced Compliance & Audit Tools",
      "Dedicated Global Success Team"
    ]
  }
];

export default function PricingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-zinc-900 text-white">
      <Navbar />

      <div className="relative">
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Additional pattern */}
        <div className="fixed inset-0 z-[1] opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>

        <main className="pt-28 pb-16 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">

            {/* Page Header */}
            <section className="relative py-24 px-4 overflow-hidden">
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <ShineBorder
                      className="absolute inset-0 rounded-lg"
                      borderWidth={1}
                      shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
                      duration={8}
                    />
                    <Button asChild variant="ghost" size="sm" className="relative text-gray-400 hover:text-white border border-white/10">
                      <Link href="/">
                        <ArrowRight className="h-4 w-4 mr-2 rotate-180 text-blue-400" />
                        Back to Home
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <ShineBorder
                      className="absolute inset-0 rounded-full"
                      borderWidth={1}
                      shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                      duration={10}
                    />
                    <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium">
                      <Calculator className="w-4 h-4 mr-2 text-blue-400" />
                      GURU AI Pricing
                    </Badge>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                    Choose Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">GURU Solution</span>
                  </h1>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Transform your legal practice with privacy-first AI. No recurring cloud costs, no data risks - just powerful, on-device intelligence that works for you.
                  </p>
                </div>
              </div>
            </section>

            {/* Pricing Overview */}
            <section className="relative py-24 px-4">
              <div className="max-w-7xl mx-auto">

                {/* Value Proposition Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                  <Card className="bg-transparent border-white/10">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gray-800/30 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                        <Shield className="h-8 w-8 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Privacy First</h3>
                      <p className="text-gray-400 text-sm">
                        Your client data never leaves your premises. 100% on-device processing with zero cloud dependencies.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-transparent border-white/10">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gray-800/30 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                        <Zap className="h-8 w-8 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Predictable Costs</h3>
                      <p className="text-gray-400 text-sm">
                        One-time purchase with no API fees, usage limits, or escalating cloud costs. Own your AI infrastructure.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-transparent border-white/10">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gray-800/30 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                        <Cpu className="h-8 w-8 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Enterprise Performance</h3>
                      <p className="text-gray-400 text-sm">
                        Multi-engine AI approach handles complex legal documents, handwriting, tables, and evidence bundles with confidence scoring.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Pricing Tiers */}
                <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-20 items-stretch">
                  {pricingTiers.map((tier, index) => (
                    <motion.div
                      key={tier.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative flex flex-col h-full"
                    >
                      <ShineBorder
                        className="absolute inset-0 rounded-xl"
                        borderWidth={1}
                        shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
                        duration={12 + index * 2}
                      />

                      <Card className="w-full bg-transparent border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/5 group-hover:scale-[1.02] flex flex-col h-full">
                        <CardHeader className="text-center pb-4 flex-shrink-0">
                          <CardTitle className="text-2xl font-bold text-white group-hover:text-gray-100 mb-2 transition-all duration-300">
                            {tier.name}
                          </CardTitle>
                          <div className="text-3xl font-bold text-white group-hover:text-gray-100 mb-2 transition-all duration-300">
                            <span className="text-emerald-400">£</span><span className="text-gray-200">{tier.price.replace('From £', '')}</span>
                          </div>
                          <CardDescription className="text-gray-400 group-hover:text-gray-300 text-sm transition-all duration-300">
                            {tier.subtitle}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="flex flex-col flex-1 justify-between p-6">
                          <div className="flex flex-col flex-1">
                            <p className="text-gray-300 group-hover:text-gray-200 text-sm mb-6 text-center transition-all duration-300">
                              {tier.description}
                            </p>

                            <ul className="space-y-3 mb-8 flex-1">
                              {tier.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start">
                                  <Check className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300 mr-3 mt-0.5 flex-shrink-0 transition-all duration-300" />
                                  <span className="text-gray-300 group-hover:text-gray-200 text-sm transition-all duration-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Button
                            asChild
                            className="w-full bg-white text-black hover:bg-gray-100 flex-shrink-0"
                          >
                            <Link href={tier.buttonLink}>
                              {tier.buttonText}
                              <ArrowRight className="w-4 h-4 ml-2 text-blue-400" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Enterprise Solutions */}
                <div className="mb-20">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Enterprise Solutions
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                      Flexible, scalable solutions for large organizations without rigid pricing structures.
                      Each enterprise deployment is customized based on your specific needs and infrastructure.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    {additionalServices.map((service, index) => (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="relative flex flex-col h-full"
                      >
                        <Card className="bg-transparent border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 w-full group-hover:scale-[1.02] flex flex-col h-full">
                          <CardHeader className="text-center flex-shrink-0">
                            <CardTitle className="text-xl font-bold text-white group-hover:text-gray-100 mb-2 transition-all duration-300">
                              {service.name}
                            </CardTitle>
                            <div className="text-2xl font-bold text-white group-hover:text-gray-100 mb-2 transition-all duration-300">
                              <span className="text-emerald-400">£</span><span className="text-gray-200">{service.price.replace('From £', '')}</span>
                            </div>
                            <CardDescription className="text-gray-400 group-hover:text-gray-300 text-sm transition-all duration-300">
                              {service.description}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="flex flex-col flex-1 justify-between p-6">
                            <ul className="space-y-3 mb-8 flex-1">
                              {service.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start">
                                  <Check className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300 mr-3 mt-0.5 flex-shrink-0 transition-all duration-300" />
                                  <span className="text-gray-300 group-hover:text-gray-200 text-sm transition-all duration-300">{feature}</span>
                                </li>
                              ))}
                            </ul>

                            <Button
                              asChild
                              className="w-full bg-white text-black hover:bg-gray-100 flex-shrink-0"
                            >
                              <Link href="/contact">
                                Contact Sales
                                <ArrowRight className="w-4 h-4 ml-2 text-blue-400" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <Card className="bg-gray-900/20 border-white/10">
                  <CardContent className="p-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Ready to Transform Your Legal Practice?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                      Join leading UK law firms who've chosen privacy-first AI.
                      Schedule a consultation to see how GURU can revolutionize your document processing workflow.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild className="bg-white text-black hover:bg-gray-100">
                        <Link href="/roi-calculator">
                          <Calculator className="w-4 h-4 mr-2 text-orange-400" />
                          Calculate Your ROI
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                        <Link href="/contact">
                          <Users className="w-4 h-4 mr-2 text-purple-400" />
                          Schedule Consultation
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </section>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
} 
