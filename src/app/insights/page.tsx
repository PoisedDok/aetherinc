"use client";

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import NewsInsights from "@/components/sections/NewsInsights"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Globe, TrendingUp, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';
import { ShineBorder } from '@/components/magicui/shine-border';
import { Badge } from "@/components/ui/badge";

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="relative">
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 z-0 opacity-30">
          <InteractiveGridPattern 
            className="w-full h-full" 
            dotColor="rgba(255, 255, 255, 0.06)"
            size={20}
          />
        </div>

        {/* Gradient overlay removed for transparency */}

        {/* Additional pattern */}
        <div className="fixed inset-0 z-[1] opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>
      
        <main className="pt-28 relative z-10">
          {/* Page Header */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <ShineBorder 
                    className="absolute inset-0 rounded-lg" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
                    duration={8}
                  />
                  <Button asChild variant="ghost" size="sm" className="relative text-gray-400 hover:text-white bg-black/20 border border-white/10 backdrop-blur-sm">
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
                  <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-black/30">
                    <Shield className="w-4 h-4 mr-2" />
                    Latest Updates
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Industry <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">Insights</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Stay informed about the latest developments in AI security, privacy breaches, 
                  and the growing importance of local AI processing solutions.
                </p>
              </div>
            </div>
          </section>

          {/* News & Insights Section */}
          <NewsInsights hideHeader />

          {/* Privacy First Manifesto */}
          <section className="py-24 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Privacy-First AI Matters
                </h2>
                <p className="text-xl text-gray-300">
                  The future of AI isn't just about intelligence—it's about trust, control, and security.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-300">The Problem</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-2">Cloud Dependencies</h4>
                          <p className="text-gray-400 text-sm">
                            Major AI services experience regular outages, leaving businesses stranded without their AI tools.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-2">Data Vulnerabilities</h4>
                          <p className="text-gray-400 text-sm">
                            Sensitive business data sent to external AI services faces security risks and compliance issues.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-2">Privacy Concerns</h4>
                          <p className="text-gray-400 text-sm">
                            Users have no control over how their data is processed, stored, or potentially misused.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-200">The Solution</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-gray-300 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-2">Local Processing</h4>
                          <p className="text-gray-400 text-sm">
                            AI runs entirely on your premises, ensuring 100% uptime and complete data control.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-gray-300 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-2">Enterprise Security</h4>
                          <p className="text-gray-400 text-sm">
                            Your data never leaves your infrastructure, meeting the strictest compliance requirements.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-gray-300 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-2">True Privacy</h4>
                          <p className="text-gray-400 text-sm">
                            Users maintain complete sovereignty over their data and AI interactions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Market Analysis */}
          <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Market Trends & Analysis
                </h2>
                <p className="text-xl text-gray-300">
                  Understanding the shift towards privacy-first AI solutions
                </p>
              </div>

              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={16}
                />
                <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-black/80 transition-all duration-300">
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">73%</div>
                      <div className="text-gray-300 mb-2">Enterprise Concerns</div>
                      <div className="text-sm text-gray-400">
                        of enterprises worry about AI data privacy
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-4xl font-bold text-gray-300 mb-2">156%</div>
                      <div className="text-gray-300 mb-2">Market Growth</div>
                      <div className="text-sm text-gray-400">
                        edge AI market growth by 2027
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-4xl font-bold text-gray-200 mb-2">94%</div>
                      <div className="text-gray-300 mb-2">Reliability Demand</div>
                      <div className="text-sm text-gray-400">
                        require 99.9%+ AI service uptime
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Stay Ahead of the Curve
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Don't wait for the next AI outage or data breach. Take control with privacy-first AI solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative">
                  <ShineBorder 
                    className="absolute inset-0 rounded-full opacity-100" 
                    borderWidth={2}
                    shineColor={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.7)"]}
                    duration={10}
                  />
                  <Button asChild size="lg" className="relative bg-white hover:bg-gray-100 text-black px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300">
                    <Link href="/products">
                      Explore GURU <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                
                <div className="relative">
                  <ShineBorder 
                    className="absolute inset-0 rounded-full" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.4)"]}
                    duration={14}
                  />
                  <Button asChild variant="outline" size="lg" className="relative border-white/30 text-white hover:bg-white/10 bg-black/30 backdrop-blur-sm px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300">
                    <Link href="/services">
                      Get Consulting
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      
      <Footer />
    </div>
  )
} 