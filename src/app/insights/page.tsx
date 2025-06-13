import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import NewsInsights from "@/components/sections/NewsInsights"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Globe, TrendingUp, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-28">
        {/* Page Header */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-800/10 to-gray-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Industry Insights
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Stay informed about the latest developments in AI security, privacy breaches, 
                and the growing importance of local AI processing solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Key Trends Overview */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gray-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Outages</h3>
                <p className="text-gray-400">Major service disruptions</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gray-700/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Data Breaches</h3>
                <p className="text-gray-400">Security vulnerabilities</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gray-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-gray-200" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Local AI Growth</h3>
                <p className="text-gray-400">Rising adoption rates</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gray-400/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Regulation</h3>
                <p className="text-gray-400">Policy developments</p>
              </div>
            </div>
          </div>
        </section>

        {/* News & Insights Section */}
        <NewsInsights />

        {/* Privacy First Manifesto */}
        <section className="py-24 px-4 bg-white/5">
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

            <div className="bg-gradient-to-r from-gray-800/10 to-gray-900/10 rounded-2xl p-8 border border-white/10">
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
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-r from-gray-800/10 to-gray-900/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Don't wait for the next AI outage or data breach. Take control with privacy-first AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
                <Link href="/products">
                  Explore GURU <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                <Link href="/services">
                  Get Consulting
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 