"use client";

import React, { useRef } from 'react';
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import About from "@/components/sections/About"

import { ShineBorder } from '@/components/magicui/shine-border';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Users, Calendar, MapPin, Award, Sparkles, Calculator } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const aboutRef = useRef<HTMLElement | null>(null);

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      
      <div className="relative">
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>

        {/* Gradient overlay removed for transparency */}

        <main className="pt-28 relative z-10">
          {/* Page Header */}
          <section className="relative py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex items-center justify-between gap-4 mb-8">
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
                <div className="relative">
                  <ShineBorder
                    className="absolute inset-0 rounded-lg"
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
                    duration={8}
                  />
                  <Button asChild variant="ghost" size="sm" className="relative text-gray-400 hover:text-white border border-white/10">
                    <Link href="/roi-calculator">
                      <Calculator className="h-4 w-4 mr-2" />
                      ROI Calculator
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
                    <Sparkles className="w-4 h-4 mr-2" />
                    Our Story
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                  About <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">AetherInc</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Inspired by “aether,” the limitless fabric of space, we build AetherArena so you can harness powerful,
                on-device AI with absolute privacy, self-learning AI universe—no cloud, no limits.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Values */}
          <section className="relative py-24 px-4 overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10 text-center space-y-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Our Mission & Core Values
              </h2>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                AetherInc exists to <strong>unlock human potential</strong> with privacy-first AI. We believe
                every professional should be able to harness cutting-edge intelligence <em>without giving up control of their data</em>.
                That guiding principle shapes everything we build—from on-device models to transparent pricing.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <Card className="bg-transparent border-white/10 hover:border-white/20 p-6 backdrop-blur-sm h-full transition-all duration-300 hover:bg-white/5 group-hover:scale-[1.02]">
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-gray-100 transition-all duration-300">Privacy Before Profit</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 text-sm leading-relaxed transition-all duration-300">
                    Your information is sacred. We will never mine, sell, or share client data. Our business model is simple:
                    build excellent software and charge fairly for it—no hidden data monetisation.
                  </p>
                </Card>
                <Card className="bg-transparent border-white/10 hover:border-white/20 p-6 backdrop-blur-sm h-full transition-all duration-300 hover:bg-white/5 group-hover:scale-[1.02]">
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-gray-100 transition-all duration-300">Radical Simplicity</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 text-sm leading-relaxed transition-all duration-300">
                    Great technology should feel invisible. From product design to customer support, we obsess over removing friction so you can focus on meaningful work, not tool maintenance.
                  </p>
                </Card>
                <Card className="bg-transparent border-white/10 hover:border-white/20 p-6 backdrop-blur-sm h-full transition-all duration-300 hover:bg-white/5 group-hover:scale-[1.02]">
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-gray-100 transition-all duration-300">Measured Innovation</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 text-sm leading-relaxed transition-all duration-300">
                    We pursue breakthrough research while maintaining rigorous testing and peer review. Innovation means nothing unless it is <em>reliable</em>, <em>auditable</em>, and <em>safe</em> in real-world use.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Company Quick Facts */}
          <section className="relative py-24 px-4">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid md:grid-cols-4 gap-8 mb-16">
                <div className="relative group">
                  <ShineBorder 
                    className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                    duration={12}
                  />
                  <Card className="relative border-white/10 hover:border-white/20 p-6 text-center transition-all duration-300 group-hover:scale-[1.02] hover:bg-white/5">
                    <div className="w-12 h-12 bg-white/10 group-hover:bg-white/15 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                      <Calendar className="h-6 w-6 text-white/80 group-hover:text-white transition-all duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-gray-100 transition-all duration-300">Founded</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-all duration-300">June 10, 2025</p>
                  </Card>
                </div>
                
                <div className="relative group">
                  <ShineBorder 
                    className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                    duration={14}
                  />
                  <Card className="relative border-white/10 hover:border-white/20 p-6 text-center transition-all duration-300 group-hover:scale-[1.02] hover:bg-white/5">
                    <div className="w-12 h-12 bg-white/10 group-hover:bg-white/15 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                      <MapPin className="h-6 w-6 text-white/80 group-hover:text-white transition-all duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-gray-100 transition-all duration-300">Headquarters</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-all duration-300">Glasgow, Scotland</p>
                  </Card>
                </div>
                
                <div className="relative group">
                  <ShineBorder 
                    className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                    duration={16}
                  />
                  <Card className="relative border-white/10 hover:border-white/20 p-6 text-center transition-all duration-300 group-hover:scale-[1.02] hover:bg-white/5">
                    <div className="w-12 h-12 bg-white/10 group-hover:bg-white/15 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                      <Award className="h-6 w-6 text-white/80 group-hover:text-white transition-all duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-gray-100 transition-all duration-300">Grant Winner</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-all duration-300">Glasgow University</p>
                  </Card>
                </div>
                
                <div className="relative group">
                  <ShineBorder 
                    className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                    duration={18}
                  />
                  <Card className="relative border-white/10 hover:border-white/20 p-6 text-center transition-all duration-300 group-hover:scale-[1.02] hover:bg-white/5">
                    <div className="w-12 h-12 bg-white/10 group-hover:bg-white/15 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                      <Users className="h-6 w-6 text-white/80 group-hover:text-white transition-all duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-gray-100 transition-all duration-300">Team</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-all duration-300">Solo Founder</p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* The Minds Behind AetherInc Section */}
          <About aboutRef={aboutRef} />

        </main>
      </div>
      
      <Footer />
    </div>
  )
} 