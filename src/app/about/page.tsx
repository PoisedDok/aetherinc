"use client";

import React, { useRef } from 'react';
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import About from "@/components/sections/About"

import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';
import { ShineBorder } from '@/components/magicui/shine-border';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, Users, Calendar, MapPin, Award, Sparkles } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const aboutRef = useRef<HTMLElement | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-28">
        {/* Page Header */}
        <section className="relative py-24 px-4 bg-black overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-30">
            <InteractiveGridPattern 
              className="w-full h-full" 
              dotColor="rgba(255, 255, 255, 0.06)"
              size={20}
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/40 to-black z-[1]" />

          {/* Additional pattern */}
          <div className="absolute inset-0 z-[1] opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-8">
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
                  <Sparkles className="w-4 h-4 mr-2" />
                  Our Story
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                About <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">AetherInc</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                From a small town in India to the tech hub of Glasgow, discover the passionate 
                journey behind AetherInc's mission to revolutionize AI with privacy-first solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Company Quick Facts */}
        <section className="relative py-24 px-4 bg-black">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-25">
            <InteractiveGridPattern 
              className="w-full h-full" 
              dotColor="rgba(255, 255, 255, 0.05)"
              size={24}
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/30 to-black z-[1]" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={12}
                />
                <Card className="relative bg-black/60 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-black/80 transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-white/80" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Founded</h3>
                  <p className="text-gray-400">June 10, 2025</p>
                </Card>
              </div>
              
              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={14}
                />
                <Card className="relative bg-black/60 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-black/80 transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-white/80" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Headquarters</h3>
                  <p className="text-gray-400">Glasgow, Scotland</p>
                </Card>
              </div>
              
              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={16}
                />
                <Card className="relative bg-black/60 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-black/80 transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-white/80" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Grant Winner</h3>
                  <p className="text-gray-400">Glasgow University</p>
                </Card>
              </div>
              
              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={18}
                />
                <Card className="relative bg-black/60 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-black/80 transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-white/80" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Team</h3>
                  <p className="text-gray-400">2 Co-founders</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* The Minds Behind AetherInc Section */}
        <About aboutRef={aboutRef} />

        {/* CTA Section */}
        <section className="relative py-24 px-4 bg-black overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-25">
            <InteractiveGridPattern 
              className="w-full h-full" 
              dotColor="rgba(255, 255, 255, 0.07)"
              size={18}
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/30 to-black z-[1]" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Join Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">Journey?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Be part of the privacy-first AI revolution. Explore our products and services.
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
                    Explore Products <ArrowRight className="ml-2 h-5 w-5" />
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