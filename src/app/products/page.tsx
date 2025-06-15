"use client";

import React from 'react';
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProductVision from "@/components/sections/ProductVision"
import { ShineBorder } from '@/components/magicui/shine-border';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, Brain, Cpu, Shield, Zap, CheckCircle, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import ReviewsMarquee from "@/components/sections/ReviewsMarquee";
import { motion } from 'framer-motion';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 bg-transparent overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-30">
          </div>

          {/* Gradient overlay removed to allow Jarvis background to show through */}

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-block"
            >
              <div className="relative">
                <ShineBorder 
                  className="absolute inset-0 rounded-full" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={12}
                />
                <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-transparent">
                  Our Products
                </Badge>
              </div>
            </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Smart AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">Without&nbsp;The&nbsp;Cloud</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Your personal AI that keeps your data private. No internet needed. No monthly fees.
              </p>
          </div>
        </section>

        {/* GURU Product Section */}
        <section className="relative py-24 px-4 bg-transparent">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-25">
          </div>

          {/* Gradient overlay removed to allow Jarvis background to show through */}

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="mb-6">
                  <div className="relative inline-block">
                    <ShineBorder 
                      className="absolute inset-0 rounded-full" 
                      borderWidth={1}
                      shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                      duration={12}
                    />
                    <Badge variant="outline" className="relative text-white/90 border-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm bg-transparent">
                      <Brain className="h-4 w-4 mr-2" />
                      Flagship Product
                    </Badge>
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">GURU</span>
                  <br />Smart&nbsp;Helper
                </h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Ask questions, get help with work, or create content—all while keeping your information private.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-white/80" />
                    <span className="text-gray-300">Works 100% offline</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-white/80" />
                    <span className="text-gray-300">Super fast responses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-white/80" />
                    <span className="text-gray-300">Your data stays private</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-white/80" />
                    <span className="text-gray-300">Easy to use</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-white/80" />
                    <span className="text-gray-300">No internet required</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <ShineBorder 
                      className="absolute inset-0 rounded-full opacity-100" 
                      borderWidth={2}
                      shineColor={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.7)"]}
                      duration={10}
                    />
                    <Button size="lg" className="relative bg-white hover:bg-gray-100 text-black px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300">
                      Learn More <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <ShineBorder 
                      className="absolute inset-0 rounded-full" 
                      borderWidth={1}
                      shineColor={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.4)"]}
                      duration={14}
                    />
                    <Button variant="outline" size="lg" className="relative border-white/30 text-white hover:bg-white/10 bg-transparent px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300">
                      Schedule Demo
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={16}
                />
                <Card className="relative bg-transparent border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="aspect-square bg-transparent rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Brain className="h-20 w-20 text-white/80 mx-auto mb-6" />
                      <div className="text-3xl font-bold text-white mb-3">GURU</div>
                      <div className="text-gray-400 mb-6">Privacy-First AI Assistant</div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                        <Cpu className="h-4 w-4" />
                        NVIDIA Jetson Orin
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="relative group">
              <ShineBorder 
                className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                duration={18}
              />
              <Card className="relative bg-transparent border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-center text-white">Technical Specifications</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Cpu className="h-6 w-6 text-white/80" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-white">Processing Power</h4>
                    <p className="text-gray-400">Powerful brain<br />Fast responses</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-6 w-6 text-white/80" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-white">Security</h4>
                    <p className="text-gray-400">Built-in protection<br />Works offline</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-6 w-6 text-white/80" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-white">Performance</h4>
                    <p className="text-gray-400">Instant answers<br />No waiting</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* AetherArena Section */}
        <section className="relative py-24 px-4 bg-transparent">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-25">
          </div>

          {/* Gradient overlay removed to allow Jarvis background to show through */}

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="relative inline-block mb-6">
                <ShineBorder 
                  className="absolute inset-0 rounded-full" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={12}
                />
                <Badge variant="outline" className="relative text-white/90 border-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm bg-transparent">
                  <Star className="h-4 w-4 mr-2" />
                  Enterprise Platform
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">AetherArena</span>
                <br />For&nbsp;Business
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Manage all your team's AI helpers from one place. Keep company data safe.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={14}
                />
                <Card className="relative bg-transparent border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group-hover:scale-[1.02]">
                  <h3 className="text-2xl font-bold mb-4 text-white">Enterprise Features</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-white/80" />
                      <span className="text-gray-300">Multi-device orchestration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-white/80" />
                      <span className="text-gray-300">Advanced workflow automation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-white/80" />
                      <span className="text-gray-300">Team collaboration tools</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-white/80" />
                      <span className="text-gray-300">Compliance reporting</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-white/80" />
                      <span className="text-gray-300">Role-based access control</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={16}
                />
                <Card className="relative bg-transparent border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group-hover:scale-[1.02]">
                  <h3 className="text-2xl font-bold mb-4 text-white">Self-Improving Architecture</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-white/80" />
                      <span className="text-gray-300">Continuous learning capabilities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-white/80" />
                      <span className="text-gray-300">Adaptive performance optimization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-white/80" />
                      <span className="text-gray-300">Intelligent resource allocation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-white/80" />
                      <span className="text-gray-300">Predictive maintenance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-white/80" />
                      <span className="text-gray-300">Automated scaling</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative">
                  <ShineBorder 
                    className="absolute inset-0 rounded-full opacity-100" 
                    borderWidth={2}
                    shineColor={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.7)"]}
                    duration={10}
                  />
                  <Button size="lg" className="relative bg-white hover:bg-gray-100 text-black px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300">
                    Request Demo <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                
                <div className="relative">
                  <ShineBorder 
                    className="absolute inset-0 rounded-full" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.4)"]}
                    duration={14}
                  />
                  <Button variant="outline" size="lg" className="relative border-white/30 text-white hover:bg-white/10 bg-transparent px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Vision Section */}
        <ProductVision />

        {/* Customer Love */}
        <ReviewsMarquee />

        {/* CTA Section */}
        <section className="relative py-24 px-4 bg-transparent overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-25">
          </div>

          {/* Gradient overlay removed to allow Jarvis background to show through */}

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Experience <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">Privacy-First AI?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Join the revolution in artificial intelligence. Discover how our solutions can transform your workflow while keeping your data secure.
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
                  <Link href="/contact">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
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
                <Button asChild variant="outline" size="lg" className="relative border-white/30 text-white hover:bg-white/10 bg-transparent px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300">
                  <Link href="/services">
                    View Services
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 