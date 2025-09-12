"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShineBorder } from '@/components/magicui/shine-border';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  FileText,
  Users,
  Shield,
  BarChart3,
  LineChart,
  ArrowLeft,
  Sparkles,
  Zap,
  Cloud,
  Cpu,
  Database,
  Settings
} from 'lucide-react';
import Link from 'next/link';

interface CloudProvider {
  name: string;
  type: 'ai_assistant' | 'api_tokens' | 'hosting';
  pricing: {
    monthly?: number;
    perUser?: number;
    perGB?: number;
    perToken?: number;
  };
  description: string;
}

interface CalculatorInputs {
  // Quick setup
  firmPreset: 'solo' | 'small' | 'medium' | 'large' | 'enterprise_flexible' | 'enterprise_comprehensive' | 'global_enterprise';

  // Cloud AI selection
  selectedCloudProvider: 'cocounsel' | 'harvey' | 'custom';
  cocounselTier: 'core' | 'all_access';
  customMonthlyCost: number;

  // Usage estimates (lawyer-friendly)
  monthlyAIQueries: number; // How many AI research queries per month
  caseLoadLevel: 'light' | 'moderate' | 'heavy'; // Active case load
  documentVolume: 'low' | 'medium' | 'high'; // Document processing volume

  // Document hosting (simplified)
  useHosting: boolean;
  activeCases: number; // Number of active cases needing storage

  // AetherInc (GURU) setup
  baseLicense: number; // Base license cost from preset
  hardwareLease: boolean;
  leaseTerm: number;
  servicePlan: boolean;
  selectedAddons: string[];
  professionalServices: number; // Implementation and training costs
}

interface ROICalculation {
  cloudCosts: {
    aiAssistant: number;
    apiTokens: number;
    hosting: number;
    totalMonthly: number;
    totalAnnual: number;
    totalThreeYear: number;
  };
  aetherIncCosts: {
    oneTime: number;
    monthly: number;
    annual: number;
    threeYear: number;
  };
  savings: {
    monthly: number;
    annual: number;
    threeYear: number;
  };
  breakevenMonths: number;
  roi: {
    year1: number;
    year2: number;
    year3: number;
  };
  costBreakdown: {
    cloudComponents: {
      aiAssistant: number;
      apiTokens: number;
      hosting: number;
    };
    guruComponents: {
      license: number;
      hardware: number;
      service: number;
      addons: number;
      professionalServices: number;
    };
  };
}


// Firm presets for quick setup (lawyer-friendly) - Based on actual business model and realistic pricing
const firmPresets = {
  solo: {
    lawyers: 1,
    monthlyAIQueries: 200, // More realistic: 5-7 queries/day for busy solo
    caseLoadLevel: 'light' as const,
    documentVolume: 'low' as const,
    activeCases: 12, // 2-3 active cases typical for solo
    // GURU Solution: Base license + essential support
    baseLicense: 5000, // £5,000 base license
    hardwareLease: false, // Outright purchase for solo
    servicePlan: true, // Monthly support essential
    recommendedAddons: [], // Minimal add-ons for solo
    professionalServices: 3000, // £3,000 implementation
    description: "Solo practitioner"
  },
  small: {
    lawyers: 8,
    monthlyAIQueries: 800, // More realistic: ~100 queries/lawyer/month
    caseLoadLevel: 'moderate' as const,
    documentVolume: 'medium' as const,
    activeCases: 120, // 15 active cases total (realistic case turnover)
    // GURU Solution: Standard package for growing firms
    baseLicense: 15000, // £15,000 base license
    hardwareLease: true, // 24-month lease affordable
    servicePlan: true, // Monthly support needed
    recommendedAddons: ['handwriting'], // £2,000 handwriting add-on
    professionalServices: 8000, // £8,000 implementation + training
    description: "Small firm (2-15 lawyers)"
  },
  medium: {
    lawyers: 35,
    monthlyAIQueries: 2800, // More realistic: ~80 queries/lawyer/month
    caseLoadLevel: 'moderate' as const,
    documentVolume: 'high' as const,
    activeCases: 420, // 12 active cases/lawyer (realistic load)
    // GURU Solution: Enhanced package for established firms
    baseLicense: 30000, // £30,000 base license
    hardwareLease: true, // 36-month lease cost-effective
    servicePlan: true, // Monthly + professional services
    recommendedAddons: ['handwriting', 'tables'], // £5,000 total add-ons
    professionalServices: 15000, // £15,000 implementation + workflow mapping
    description: "Medium firm (15-60 lawyers)"
  },
  large: {
    lawyers: 100,
    monthlyAIQueries: 6000, // More realistic: ~60 queries/lawyer/month
    caseLoadLevel: 'heavy' as const,
    documentVolume: 'high' as const,
    activeCases: 800, // 8 active cases/lawyer (high volume practice)
    // GURU Solution: Enterprise package for large firms
    baseLicense: 45000, // £45,000 base license
    hardwareLease: true, // 36-month lease standard
    servicePlan: true, // Enterprise support + implementation
    recommendedAddons: ['handwriting', 'tables', 'redaction'], // £9,000 total add-ons
    professionalServices: 25000, // £25,000 full implementation + training
    description: "Large firm (60-150 lawyers)"
  },
  enterprise_flexible: {
    lawyers: 200,
    monthlyAIQueries: 10000, // ~50 queries/lawyer/month (scalable)
    caseLoadLevel: 'heavy' as const,
    documentVolume: 'high' as const,
    activeCases: 1400, // 7 active cases/lawyer (efficient case management)
    // GURU Solution: Flexible enterprise - customize based on needs
    baseLicense: 80000, // £80,000 for 2 appliances/sites
    hardwareLease: true, // Asset-backed financing preferred
    servicePlan: true, // Premium enterprise support
    recommendedAddons: ['handwriting', 'tables', 'redaction'], // £9,000 base add-ons
    professionalServices: 35000, // £35,000 custom implementation
    description: "Enterprise Flexible (150-300 lawyers)"
  },
  enterprise_comprehensive: {
    lawyers: 300,
    monthlyAIQueries: 13500, // ~45 queries/lawyer/month
    caseLoadLevel: 'heavy' as const,
    documentVolume: 'high' as const,
    activeCases: 1800, // 6 active cases/lawyer (optimized workflow)
    // GURU Solution: Full enterprise suite with all features
    baseLicense: 120000, // £120,000 for 3 appliances/sites
    hardwareLease: true, // Multiple appliances, asset-backed
    servicePlan: true, // Maximum enterprise support
    recommendedAddons: ['handwriting', 'tables', 'redaction', 'chain'], // £16,000 total add-ons
    professionalServices: 45000, // £45,000 comprehensive implementation
    description: "Enterprise Comprehensive (250-400 lawyers)"
  },
  global_enterprise: {
    lawyers: 500,
    monthlyAIQueries: 20000, // ~40 queries/lawyer/month (global scale)
    caseLoadLevel: 'heavy' as const,
    documentVolume: 'high' as const,
    activeCases: 3000, // 6 active cases/lawyer (global case load)
    // GURU Solution: Global enterprise with multiple sites
    baseLicense: 200000, // £200,000 for 4+ sites minimum
    hardwareLease: true, // Multiple appliances, asset-backed
    servicePlan: true, // Global enterprise support
    recommendedAddons: ['handwriting', 'tables', 'redaction', 'chain'], // £16,000 × sites
    professionalServices: 75000, // £75,000 global rollout + training
    description: "Global Enterprise (400+ lawyers)"
  }
};

// Real-world cloud pricing data
const cloudPricing = {
  cocounsel: {
    core: 225, // $225/user/month
    all_access: 500 // $500/user/month
  },
  harvey: 1200, // $1,200/seat/year
  openai: {
    input: 1.25, // $1.25 per million input tokens
    output: 10 // $10 per million output tokens
  },
  anthropic: {
    sonnet: { input: 3, output: 15 }, // $3/$15 per million tokens
    opus: { input: 15, output: 75 } // $15/$75 per million tokens
  },
  hosting: {
    relativity: { min: 7.6, max: 15 }, // $7.6-$15/GB/month
    average: 10 // $10/GB/month default
  }
};

// Add-on modules with actual pricing from business model
const addonOptions = [
  { id: 'handwriting', name: 'Handwriting Pro', price: 2000 }, // £2,000-5,000 range
  { id: 'tables', name: 'Tables & Forms Pro', price: 3000 }, // £3,000-7,000 range
  { id: 'redaction', name: 'Redaction & Bundle Assembly', price: 4000 }, // £4,000-8,000 range
  { id: 'chain', name: 'Chain-of-Custody', price: 2000 } // £2,000-5,000 range
];

export default function ROICalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    // Quick setup
    firmPreset: 'medium',

    // Cloud AI selection
    selectedCloudProvider: 'cocounsel',
    cocounselTier: 'core',
    customMonthlyCost: 2500,

    // Usage estimates (lawyer-friendly) - matches medium preset
    monthlyAIQueries: 2800,
    caseLoadLevel: 'moderate',
    documentVolume: 'high',

    // Document hosting (simplified)
    useHosting: true,
    activeCases: 420,

    // AetherInc setup - matches medium preset recommendations
    baseLicense: 30000, // £30,000 for medium firm
    hardwareLease: true,
    leaseTerm: 36,
    servicePlan: true,
    selectedAddons: ['handwriting', 'tables'], // £5,000 total
    professionalServices: 15000 // £15,000 implementation + workflow mapping
  });

  const calculation: ROICalculation = useMemo(() => {
    const preset = firmPresets[inputs.firmPreset];
    const lawyers = preset.lawyers;

    // Convert lawyer-friendly inputs to technical values
    const convertAIQueriesToTokens = (queries: number, caseLoad: string, docVolume: string) => {
      // Base conversion: 1 AI query ≈ 10,000 input tokens + 2,500 output tokens
      const baseInputTokens = queries * 10000 / 1000000; // Convert to millions
      const baseOutputTokens = queries * 2500 / 1000000; // Convert to millions

      // Adjust based on case load and document volume
      let multiplier = 1;
      if (caseLoad === 'heavy') multiplier *= 1.5;
      if (caseLoad === 'light') multiplier *= 0.7;
      if (docVolume === 'high') multiplier *= 1.3;
      if (docVolume === 'low') multiplier *= 0.8;

      return {
        inputTokens: baseInputTokens * multiplier,
        outputTokens: baseOutputTokens * multiplier
      };
    };

    const convertActiveCasesToGB = (activeCases: number, caseLoad: string) => {
      // Estimate: 1 active case ≈ 2-5 GB depending on complexity
      let baseGBPerCase = 3; // Average
      if (caseLoad === 'heavy') baseGBPerCase = 5;
      if (caseLoad === 'light') baseGBPerCase = 2;

      return activeCases * baseGBPerCase;
    };

    const tokens = convertAIQueriesToTokens(inputs.monthlyAIQueries, inputs.caseLoadLevel, inputs.documentVolume);
    const monthlyGBStorage = convertActiveCasesToGB(inputs.activeCases, inputs.caseLoadLevel);

    // Cloud AI Assistant Costs
    let aiAssistantMonthly = 0;
    if (inputs.selectedCloudProvider === 'cocounsel') {
      aiAssistantMonthly = lawyers * cloudPricing.cocounsel[inputs.cocounselTier];
    } else if (inputs.selectedCloudProvider === 'harvey') {
      aiAssistantMonthly = (lawyers * cloudPricing.harvey) / 12; // Convert annual to monthly
    } else {
      aiAssistantMonthly = inputs.customMonthlyCost;
    }

    // API Token Costs (automatically calculated from AI queries)
    let apiMonthly = 0;
    const provider = cloudPricing.openai; // Default to GPT pricing
    apiMonthly = (tokens.inputTokens * provider.input) + (tokens.outputTokens * provider.output);

    // Hosting Costs
    let hostingMonthly = 0;
    if (inputs.useHosting) {
      hostingMonthly = monthlyGBStorage * 10; // Use average $10/GB rate
    }

    // Total Cloud Costs
    const cloudMonthly = aiAssistantMonthly + apiMonthly + hostingMonthly;
    const cloudAnnual = cloudMonthly * 12;
    const cloudThreeYear = cloudAnnual * 3;

    // AetherInc (GURU) Costs - Comprehensive Business Model
    const baseLicense = inputs.baseLicense;

    // Hardware costs (lease-to-own) - Based on business model
    const hardwareCost = inputs.hardwareLease ? 35000 : 0; // £35,000 certified appliance
    const monthlyHardwareLease = inputs.hardwareLease ? hardwareCost / inputs.leaseTerm : 0;

    // Add-on modules costs
    const addonCost = inputs.selectedAddons.reduce((total, addonId) => {
      const addon = addonOptions.find(a => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);

    // Service plans & support costs (20% of license annually)
    const annualServiceCost = inputs.servicePlan ? baseLicense * 0.2 : 0;
    const monthlyServiceCost = annualServiceCost / 12;

    // Professional services costs (implementation, training, etc.)
    const professionalServicesCost = inputs.professionalServices;

    // Total AetherInc costs - All revenue streams
    const oneTimeCosts = baseLicense + addonCost + professionalServicesCost + (inputs.hardwareLease ? 0 : hardwareCost);
    const monthlyCosts = monthlyHardwareLease + monthlyServiceCost;
    const annualCosts = monthlyCosts * 12;
    const threeYearCosts = annualCosts * 3 + oneTimeCosts;

    // Savings calculations
    const monthlySavings = cloudMonthly - monthlyCosts;
    const annualSavings = monthlySavings * 12;
    const threeYearSavings = cloudThreeYear - threeYearCosts;

    // Breakeven analysis
    const breakevenMonths = monthlySavings > 0 ? oneTimeCosts / monthlySavings : 999;

    // ROI calculations (using cloud costs as baseline)
    const roiYear1 = monthlySavings > 0 ? (annualSavings / (oneTimeCosts + annualCosts)) * 100 : 0;
    const roiYear2 = monthlySavings > 0 ? ((annualSavings * 2) / (oneTimeCosts + annualCosts * 2)) * 100 : 0;
    const roiYear3 = monthlySavings > 0 ? ((annualSavings * 3) / (oneTimeCosts + annualCosts * 3)) * 100 : 0;

    return {
      cloudCosts: {
        aiAssistant: aiAssistantMonthly,
        apiTokens: apiMonthly,
        hosting: hostingMonthly,
        totalMonthly: cloudMonthly,
        totalAnnual: cloudAnnual,
        totalThreeYear: cloudThreeYear
      },
      aetherIncCosts: {
        oneTime: oneTimeCosts,
        monthly: monthlyCosts,
        annual: annualCosts,
        threeYear: threeYearCosts
      },
      savings: {
        monthly: monthlySavings,
        annual: annualSavings,
        threeYear: threeYearSavings
      },
      breakevenMonths: breakevenMonths,
      roi: {
        year1: roiYear1,
        year2: roiYear2,
        year3: roiYear3
      },
      costBreakdown: {
        cloudComponents: {
          aiAssistant: aiAssistantMonthly,
          apiTokens: apiMonthly,
          hosting: hostingMonthly
        },
        guruComponents: {
          license: baseLicense / 12, // Monthly amortized license cost
          hardware: monthlyHardwareLease,
          service: monthlyServiceCost,
          addons: addonCost / 12, // Monthly amortized add-on costs
          professionalServices: professionalServicesCost / 12 // Monthly amortized professional services
        }
      }
    };
  }, [inputs]);

  const updateInput = <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: keyof typeof firmPresets) => {
    const presetData = firmPresets[preset];
    setInputs(prev => ({
      ...prev,
      firmPreset: preset,
      // Cloud usage patterns
      monthlyAIQueries: presetData.monthlyAIQueries,
      caseLoadLevel: presetData.caseLoadLevel,
      documentVolume: presetData.documentVolume,
      activeCases: presetData.activeCases,
      // GURU Solution configuration - All revenue streams
      baseLicense: presetData.baseLicense,
      hardwareLease: presetData.hardwareLease,
      servicePlan: presetData.servicePlan,
      selectedAddons: presetData.recommendedAddons,
      professionalServices: presetData.professionalServices
    }));
  };

  const toggleAddon = (addonId: string) => {
    setInputs(prev => ({
      ...prev,
      selectedAddons: prev.selectedAddons.includes(addonId)
        ? prev.selectedAddons.filter(id => id !== addonId)
        : [...prev.selectedAddons, addonId]
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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
                      <ArrowLeft className="h-4 w-4 mr-2" />
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
                    <Calculator className="w-4 h-4 mr-2" />
                    ROI Calculator
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                  Cloud AI vs <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">GURU</span> ROI Calculator
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Simple cost comparison: Just tell us about your practice and we'll show you how much you can save by switching from cloud AI to GURU's secure, on-device solution.
                </p>
              </div>
            </div>
          </section>

          {/* Calculator Content */}
          <section className="relative py-24 px-4">

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Panel */}
            <div className="lg:col-span-1">
              <Card className="bg-transparent border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/5 group-hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-400 group-hover:text-blue-300 transition-all duration-300">
                    <Settings className="w-5 h-5 mr-2" />
                    Tell Us About Your Practice
                  </CardTitle>
                  <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-all duration-300">
                    Select your firm size or customize your usage patterns below
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Firm Size Presets */}
                  <div>
                    <Label className="text-gray-300 mb-2 block">Firm Size</Label>
                    <p className="text-xs text-gray-400 mb-3">
                      Choose your firm size to auto-populate realistic usage patterns and recommended GURU solution. You can customize any values below.
                    </p>
                    <div className="grid grid-cols-3 gap-2 max-w-4xl">
                      {Object.entries(firmPresets).map(([key, preset]) => (
                        <Button
                          key={key}
                          variant={inputs.firmPreset === key ? "default" : "outline"}
                          onClick={() => applyPreset(key as keyof typeof firmPresets)}
                          className={`text-xs h-auto py-3 px-2 relative ${
                            inputs.firmPreset === key
                              ? 'bg-blue-400 text-white border-blue-400 ring-2 ring-blue-400/50'
                              : 'border-white/20 text-gray-300 hover:bg-white/5 hover:border-white/30'
                          }`}
                        >
                          <div className="text-center relative">
                            {inputs.firmPreset === key && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                              </div>
                            )}
                            <div className="font-medium text-xs mb-1">
                              {key === 'solo' ? 'Solo' :
                               key === 'small' ? 'Small' :
                               key === 'medium' ? 'Medium' :
                               key === 'large' ? 'Large' :
                               key === 'enterprise_flexible' ? 'Enterprise Flex' :
                               key === 'enterprise_comprehensive' ? 'Enterprise Comp' :
                               key === 'global_enterprise' ? 'Global' : 'Global'}
                            </div>
                            <div className="text-xs opacity-75 mb-1">{preset.lawyers} lawyers</div>
                            <div className="text-xs opacity-60 mb-1">
                              {key === 'solo' ? '~200/mo' :
                               key === 'small' ? '~800/mo' :
                               key === 'medium' ? '~2.8K/mo' :
                               key === 'large' ? '~6K/mo' :
                               key === 'enterprise_flexible' ? '~10K/mo' :
                               key === 'enterprise_comprehensive' ? '~13.5K/mo' :
                               key === 'global_enterprise' ? '~20K/mo' : '~20K/mo'}
                            </div>
                            <div className="text-xs opacity-50">
                              £{preset.baseLicense.toLocaleString()}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Cloud AI Provider */}
                  <div>
                    <Label className="text-gray-300 mb-3 block">Cloud AI Provider</Label>
                    <Select value={inputs.selectedCloudProvider} onValueChange={(value: any) => updateInput('selectedCloudProvider', value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10">
                        <SelectItem value="cocounsel">CoCounsel ($225-$500/user/mo)</SelectItem>
                        <SelectItem value="harvey">Harvey ($1,200/seat/yr)</SelectItem>
                        <SelectItem value="custom">Custom Provider</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* CoCounsel Tier Selection */}
                  {inputs.selectedCloudProvider === 'cocounsel' && (
                    <div>
                      <Label className="text-gray-300 mb-3 block">CoCounsel Tier</Label>
                      <Select value={inputs.cocounselTier} onValueChange={(value: any) => updateInput('cocounselTier', value)}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10">
                          <SelectItem value="core">Core ($225/user/month)</SelectItem>
                          <SelectItem value="all_access">All Access ($500/user/month)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Custom Cost Input */}
                  {inputs.selectedCloudProvider === 'custom' && (
                    <div>
                      <Label className="text-gray-300">Monthly Cloud AI Cost (£)</Label>
                      <Input
                        type="number"
                        value={inputs.customMonthlyCost}
                        onChange={(e) => updateInput('customMonthlyCost', Number(e.target.value))}
                        className="bg-white/5 border-white/10 text-white mt-2"
                      />
                    </div>
                  )}

                  {/* Usage Estimates */}
                  <div>
                    <Label className="text-gray-300 mb-3 block">Monthly AI Research Queries</Label>
                    <Input
                      type="number"
                      value={inputs.monthlyAIQueries}
                      onChange={(e) => updateInput('monthlyAIQueries', Number(e.target.value))}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="e.g., 500"
                    />
                    <p className="text-xs text-gray-400 mt-1">How many AI searches/research queries do you do per month?</p>
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-3 block">Case Load Level</Label>
                    <Select value={inputs.caseLoadLevel} onValueChange={(value: any) => updateInput('caseLoadLevel', value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10">
                        <SelectItem value="light">Light (1-2 active cases per lawyer)</SelectItem>
                        <SelectItem value="moderate">Moderate (3-5 active cases per lawyer)</SelectItem>
                        <SelectItem value="heavy">Heavy (6+ active cases per lawyer)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-3 block">Document Processing Volume</Label>
                    <Select value={inputs.documentVolume} onValueChange={(value: any) => updateInput('documentVolume', value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10">
                        <SelectItem value="low">Low (Simple contracts, basic filings)</SelectItem>
                        <SelectItem value="medium">Medium (Standard legal docs, moderate complexity)</SelectItem>
                        <SelectItem value="high">High (Complex litigation, extensive discovery)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Document Hosting */}
                  <div>
                    <Label className="text-gray-300 mb-3 block">Active Cases Storage</Label>
                    <div className="flex items-center space-x-2 mb-3">
                      <input
                        type="checkbox"
                        checked={inputs.useHosting}
                        onChange={(e) => updateInput('useHosting', e.target.checked)}
                        className="rounded"
                      />
                      <Label className="text-gray-300 text-sm">Include document hosting costs</Label>
                    </div>

                    {inputs.useHosting && (
                      <div>
                        <Label className="text-gray-300 text-sm">Number of Active Cases</Label>
                        <Input
                          type="number"
                          value={inputs.activeCases}
                          onChange={(e) => updateInput('activeCases', Number(e.target.value))}
                          className="bg-white/5 border-white/10 text-white mt-1"
                          placeholder="e.g., 50"
                        />
                        <p className="text-xs text-gray-400 mt-1">Cases currently requiring document storage and access</p>
                      </div>
                    )}
                  </div>

                  {/* AetherInc Solution */}
                  <div className="pt-6 border-t border-white/10">
                    <CardTitle className="text-blue-400 mb-4 flex items-center">
                      <Cpu className="w-5 h-5 mr-2" />
                      GURU Solution
                    </CardTitle>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-gray-300">Base License Cost</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">£</span>
                          <Input
                            type="number"
                            value={inputs.baseLicense}
                            onChange={(e) => updateInput('baseLicense', Number(e.target.value))}
                            className="bg-white/5 border-white/10 text-white mt-2 pl-8"
                            placeholder="5000"
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Perpetual software license cost (£5,000-£50,000 per site)</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={inputs.hardwareLease}
                          onChange={(e) => updateInput('hardwareLease', e.target.checked)}
                          className="rounded"
                        />
                        <Label className="text-gray-300 text-sm">Hardware lease-to-own</Label>
                      </div>

                      {inputs.hardwareLease && (
                        <div>
                          <Label className="text-gray-300 text-sm">Lease Term (months)</Label>
                          <Slider
                            value={[inputs.leaseTerm]}
                            onValueChange={(value) => updateInput('leaseTerm', value[0])}
                            min={24}
                            max={36}
                            step={12}
                            className="mt-2"
                          />
                          <div className="text-center text-sm text-gray-400 mt-1">{inputs.leaseTerm} months</div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={inputs.servicePlan}
                          onChange={(e) => updateInput('servicePlan', e.target.checked)}
                          className="rounded"
                        />
                        <Label className="text-gray-300 text-sm">Service plan (20% of license)</Label>
                      </div>

                      <div>
                        <Label className="text-gray-300">Professional Services</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">£</span>
                          <Input
                            type="number"
                            value={inputs.professionalServices}
                            onChange={(e) => updateInput('professionalServices', Number(e.target.value))}
                            className="bg-white/5 border-white/10 text-white mt-2 pl-8"
                            placeholder="5000"
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Implementation, training, and workflow integration (£5K-£75K)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-transparent border-white/10 hover:border-green-300/50 hover:bg-green-500/5 transition-all duration-300 hover:shadow-green-500/10 group-hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-300 group-hover:text-green-200 flex items-center transition-all duration-300">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Annual Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-300 group-hover:text-green-200 transition-all duration-300">
                      {formatCurrency(calculation.savings.annual)}
                    </div>
                    <p className="text-green-200/80 group-hover:text-green-100 text-sm mt-1 transition-all duration-300">
                      vs cloud solution
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-transparent border-white/10 hover:border-blue-400/50 hover:bg-blue-500/5 transition-all duration-300 hover:shadow-blue-500/10 group-hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-blue-400 group-hover:text-blue-300 flex items-center transition-all duration-300">
                      <Calculator className="w-5 h-5 mr-2" />
                      Breakeven
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-all duration-300">
                      {calculation.breakevenMonths < 999 ? `${calculation.breakevenMonths.toFixed(1)} months` : 'N/A'}
                    </div>
                    <p className="text-blue-200/80 group-hover:text-blue-100 text-sm mt-1 transition-all duration-300">
                      Time to profit
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-transparent border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 hover:shadow-purple-500/10 group-hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-500 group-hover:text-purple-400 flex items-center transition-all duration-300">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      3-Year ROI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-500 group-hover:text-purple-400 transition-all duration-300">
                      {calculation.roi.year3.toFixed(0)}%
                    </div>
                    <p className="text-purple-200/80 group-hover:text-purple-100 text-sm mt-1 transition-all duration-300">
                      Return on investment
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Cost Breakdown */}
              <Card className="bg-transparent border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/5 group-hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-400 group-hover:text-blue-300 transition-all duration-300">
                    <Cloud className="w-5 h-5 mr-2" />
                    Cloud vs GURU Cost Breakdown
                  </CardTitle>
                  <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-all duration-300">
                    Monthly cost comparison with real pricing data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-4 flex items-center">
                        <Cloud className="w-4 h-4 mr-2" />
                        Cloud AI Solution
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">AI Assistant:</span>
                          <span className="text-red-400 font-medium">{formatCurrency(calculation.costBreakdown.cloudComponents.aiAssistant)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">API Tokens:</span>
                          <span className="text-red-400 font-medium">{formatCurrency(calculation.costBreakdown.cloudComponents.apiTokens)}</span>
                        </div>
                        {inputs.useHosting && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Hosting:</span>
                            <span className="text-red-400 font-medium">{formatCurrency(calculation.costBreakdown.cloudComponents.hosting)}</span>
                          </div>
                        )}
                        <div className="border-t border-white/10 pt-2 mt-3">
                          <div className="flex justify-between items-center font-semibold">
                            <span className="text-gray-300">Monthly Total:</span>
                            <span className="text-red-400 text-lg">{formatCurrency(calculation.cloudCosts.totalMonthly)}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                            <span>Annual Total:</span>
                            <span>{formatCurrency(calculation.cloudCosts.totalAnnual)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
                        <Cpu className="w-4 h-4 mr-2" />
                        GURU Solution
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">License (monthly):</span>
                            <span className="text-green-400 font-medium">{formatCurrency(calculation.costBreakdown.guruComponents.license)}</span>
                        </div>
                        {inputs.hardwareLease && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Hardware Lease:</span>
                            <span className="text-green-400 font-medium">{formatCurrency(calculation.costBreakdown.guruComponents.hardware)}</span>
                          </div>
                        )}
                        {inputs.servicePlan && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Service Plan:</span>
                            <span className="text-green-400 font-medium">{formatCurrency(calculation.costBreakdown.guruComponents.service)}</span>
                          </div>
                        )}
                        {inputs.selectedAddons.length > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Add-On Modules:</span>
                            <span className="text-green-400 font-medium">{formatCurrency(calculation.costBreakdown.guruComponents.addons)}</span>
                          </div>
                        )}
                        {inputs.professionalServices > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Professional Services:</span>
                            <span className="text-green-400 font-medium">{formatCurrency(calculation.costBreakdown.guruComponents.professionalServices)}</span>
                          </div>
                        )}
                        <div className="border-t border-white/10 pt-2 mt-3">
                          <div className="flex justify-between items-center font-semibold">
                            <span className="text-gray-300">Monthly Total:</span>
                            <span className="text-green-400 text-lg">{formatCurrency(calculation.aetherIncCosts.monthly)}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                            <span>One-time Setup:</span>
                            <span>{formatCurrency(calculation.aetherIncCosts.oneTime)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-700/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-400">Monthly Savings</h4>
                        <p className="text-green-200/80 text-sm">Cloud vs GURU comparison</p>
                      </div>
                      <div className="text-3xl font-bold text-green-400">
                        {formatCurrency(calculation.savings.monthly)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Breakeven Analysis & ROI Timeline */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-transparent border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 hover:shadow-purple-500/10 group-hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-500 group-hover:text-purple-400 transition-all duration-300">
                      <Calculator className="w-5 h-5 mr-2" />
                      Breakeven Analysis
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-all duration-300">
                      When GURU starts saving you money
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-500 group-hover:text-purple-400 mb-2 transition-all duration-300">
                        {calculation.breakevenMonths < 999 ? `${Math.ceil(calculation.breakevenMonths)} months` : 'Never'}
                      </div>
                      <p className="text-gray-300 group-hover:text-gray-200 mb-4 transition-all duration-300">Time to break even</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-green-400 font-semibold">Monthly Savings</div>
                          <div className="text-lg text-green-400">{formatCurrency(calculation.savings.monthly)}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-blue-400 font-semibold">Upfront Investment</div>
                          <div className="text-lg text-blue-400">{formatCurrency(calculation.aetherIncCosts.oneTime)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-transparent border-white/10 hover:border-blue-400/50 hover:bg-blue-500/5 transition-all duration-300 hover:shadow-blue-500/10 group-hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-400 group-hover:text-blue-300 transition-all duration-300">
                      <LineChart className="w-5 h-5 mr-2" />
                      3-Year ROI Timeline
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-all duration-300">
                      Return on investment progression
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400 mb-1">Year 1</div>
                        <div className="text-lg text-green-400">{calculation.roi.year1.toFixed(1)}%</div>
                        <div className="text-sm text-gray-400">ROI</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400 mb-1">Year 2</div>
                        <div className="text-lg text-green-400">{calculation.roi.year2.toFixed(1)}%</div>
                        <div className="text-sm text-gray-400">ROI</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400 mb-1">Year 3</div>
                        <div className="text-lg text-green-400">{calculation.roi.year3.toFixed(1)}%</div>
                        <div className="text-sm text-gray-400">ROI</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>


              {/* Key Insights & Call to Action */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-transparent border-white/10 hover:border-yellow-300/50 hover:bg-yellow-500/5 transition-all duration-300 hover:shadow-yellow-500/10 group-hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="flex items-center text-yellow-300 group-hover:text-yellow-200 transition-all duration-300">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Key Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 group-hover:text-gray-200 text-sm transition-all duration-300">Cloud AI costs grow with your case load; GURU gives you predictable monthly pricing</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 group-hover:text-gray-200 text-sm transition-all duration-300">No more worrying about API limits or changing AI model costs</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 group-hover:text-gray-200 text-sm transition-all duration-300">Keep sensitive case documents secure with local, offline processing</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 group-hover:text-gray-200 text-sm transition-all duration-300">Most firms see ROI within 6-12 months of switching to GURU</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-transparent border-white/10 hover:border-blue-400/50 hover:bg-blue-500/5 transition-all duration-300 hover:shadow-blue-500/10 group-hover:scale-[1.02]">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 mb-4 transition-all duration-300">
                      Ready to Switch to GURU?
                    </h3>
                    <p className="text-gray-300 group-hover:text-gray-200 mb-6 transition-all duration-300">
                      Experience the benefits of privacy-first AI without the cloud costs.
                      Schedule a free consultation to see how GURU can transform your workflow.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                        <Link href="/contact">
                          <Calculator className="w-4 h-4 mr-2" />
                          Schedule Free Demo
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                        <Link href="/legal">
                          <Shield className="w-4 h-4 mr-2" />
                          Learn About Privacy
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
