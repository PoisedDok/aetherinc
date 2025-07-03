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
  // Animation variants
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

  // Shine effect component for important elements
  interface ShineEffectProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
  }

  const ShineEffect = ({ children, className = "", delay = 0 }: ShineEffectProps) => {
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
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      
      <main>
        {/* Background Grid Pattern - Consistent with services page */}
        <div className="fixed inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 bg-transparent overflow-hidden">
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

            <ShineEffect delay={0.5}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Local AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">Under&nbsp;Your&nbsp;Control</span>
              </h1>
            </ShineEffect>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              AI that respects your privacy. Everything runs locally on your hardware. You own it completely.
            </p>
          </div>
        </section>

        {/* GURU Product Section */}
        <section className="relative py-24 px-4 bg-transparent">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <div className="mb-6">
                  <div className="relative inline-block">
                    <ShineBorder 
                      className="absolute inset-0 rounded-full" 
                      borderWidth={1}
                      shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                      duration={12}
                    />
                    <Badge variant="outline" className="relative text-white/90 border-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm bg-transparent">
                      <Brain className="h-4 w-4 mr-2 text-cyan-400" />
                      Flagship Product
                    </Badge>
                  </div>
                </div>
                <ShineEffect>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">GURU</span>
                    <br />Hardware&nbsp;Companion
                  </h2>
                </ShineEffect>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  A specialized device like a Mac mini M4, designed for powerful local AI processing.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">Works 100% offline</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400" />
                    <span className="text-gray-300">Super fast responses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-gray-300">Your data stays private</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-400" />
                    <span className="text-gray-300">Easy to use</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-400" />
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
                    <Button size="lg" className="relative bg-white hover:bg-white/90 text-black px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300">
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
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="relative group"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={16}
                />
                <Card className="relative bg-transparent border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="aspect-square bg-transparent rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Brain className="h-20 w-20 text-cyan-400 mx-auto mb-6" />
                      <div className="text-3xl font-bold text-white mb-3">GURU</div>
                      <div className="text-gray-400 mb-6">AI Hardware Device</div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                        <Cpu className="h-4 w-4 text-yellow-400" />
                        NVIDIA Jetson Orin
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Technical Specifications */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="relative group"
            >
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
                      <Cpu className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-white">Processing Power</h4>
                    <p className="text-gray-400">Powerful brain<br />Fast responses</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-6 w-6 text-green-400" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-white">Security</h4>
                    <p className="text-gray-400">Built-in protection<br />Works offline</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-white">Performance</h4>
                    <p className="text-gray-400">Instant answers<br />No waiting</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* AetherArena Section */}
        <section className="relative py-24 px-4 bg-transparent">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="relative inline-block mb-6"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-full" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={12}
                />
                <Badge variant="outline" className="relative text-white/90 border-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm bg-transparent">
                  <Star className="h-4 w-4 mr-2 text-purple-400" />
                  Enterprise Platform
                </Badge>
              </motion.div>
              <ShineEffect delay={0.3}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">AetherArena</span>
                  <br />AI&nbsp;+&nbsp;OS
                </h2>
              </ShineEffect>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                A floating chat terminal with full device control, running entirely on your hardware. Install on any device or server.
              </p>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 mb-16"
            >
              <motion.div
                variants={fadeUp}
                className="relative group"
              >
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
                      <CheckCircle className="h-5 w-5 text-purple-400" />
                      <span className="text-gray-300">Modular service architecture</span>
                    </div>
                    {/* Rest of the enterprise features */}
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-cyan-400" />
                      <span className="text-gray-300">Terminal with full device control</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Custom agent deployment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-yellow-400" />
                      <span className="text-gray-300">100% local processing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-rose-400" />
                      <span className="text-gray-300">Personalized AI adaptation</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                variants={fadeUp}
                className="relative group"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={16}
                />
                <Card className="relative bg-transparent border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group-hover:scale-[1.02]">
                  <h3 className="text-2xl font-bold mb-4 text-white">Deployment Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">On-premise deployment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-cyan-400" />
                      <span className="text-gray-300">Private cloud installation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-purple-400" />
                      <span className="text-gray-300">Hybrid configurations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-yellow-400" />
                      <span className="text-gray-300">Data sovereignty compliance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-rose-400" />
                      <span className="text-gray-300">Seamless scalability</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="text-center"
            >
              <div className="relative inline-block">
                <ShineBorder 
                  className="absolute inset-0 rounded-full opacity-100" 
                  borderWidth={2}
                  shineColor={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.7)"]}
                  duration={10}
                />
                <Button asChild size="lg" className="relative bg-white hover:bg-white/90 text-black px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300">
                  <Link href="/contact" className="flex items-center gap-2">
                    Request Enterprise Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Coming Soon Products Section */}
        <section className="relative py-24 px-4 bg-transparent">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="relative inline-block mb-6"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-full" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={12}
                />
                <Badge variant="outline" className="relative text-white/90 border-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm bg-transparent">
                  <Sparkles className="h-4 w-4 mr-2 text-amber-400" />
                  Coming Soon
                </Badge>
              </motion.div>
              <ShineEffect>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">Future Products</span>
                </h2>
              </ShineEffect>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Our innovation pipeline is always active. Stay tuned for these upcoming releases.
              </p>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              {/* Future product 1 */}
              <motion.div
                variants={fadeUp}
                className="relative group"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={14}
                />
                <Card className="relative bg-transparent border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Cpu className="h-8 w-8 text-rose-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">AetherMini</h3>
                    <p className="text-gray-400 mb-4">Portable AI computing for on-the-go professionals</p>
                    <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20">Q2 2026</Badge>
                  </div>
                </Card>
              </motion.div>

              {/* Future product 2 */}
              <motion.div
                variants={fadeUp}
                className="relative group"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={16}
                />
                <Card className="relative bg-transparent border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-yellow-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">AetherPro</h3>
                    <p className="text-gray-400 mb-4">Enhanced AetherArena with specialized modules for developers</p>
                    <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20">Q4 2025</Badge>
                  </div>
                </Card>
              </motion.div>

              {/* Future product 3 */}
              <motion.div
                variants={fadeUp}
                className="relative group"
              >
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={18}
                />
                <Card className="relative bg-transparent border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">AetherVision</h3>
                    <p className="text-gray-400 mb-4">Computer vision system with on-device processing</p>
                    <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20">Q1 2026</Badge>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Reviews Section - Consistent with other pages */}
        <ReviewsMarquee />

        {/* Product Vision Section */}
        <ProductVision />
      </main>

      <Footer />
    </div>
  );
} 