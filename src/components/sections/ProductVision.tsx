"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BrainCircuit, 
  Server, 
  Smartphone,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ProductVision() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const products = [
    {
      name: "GURU",
      tagline: "Your Personal AI Assistant",
      description: "Iron Man's Jarvis reimagined for the real world. A physical AI companion that processes everything locally.",
      category: "Consumer Hardware",
      price: "£2,999",
      availability: "Pre-order Q3 2025",
      icon: <Smartphone className="h-8 w-8" />,
      color: "gray",
      features: [
        "NVIDIA Jetson Orin (67 TOPS NPU)",
        "10TB Local Storage",
        "Voice & Camera Integration",
        "100% Offline Processing",
        "OmniParser Document Reading",
        "Real-time Translation",
        "Browser Automation",
        "Privacy-First Architecture"
      ],
      useCases: [
        "Digital nomads working on unsecured Wi-Fi",
        "Healthcare professionals processing sensitive data",
        "Field technicians in remote locations",
        "Personal productivity and task management"
      ],
      specifications: {
        "Processor": "NVIDIA Jetson Orin (67 TOPS)",
        "Storage": "10TB NVMe SSD",
        "RAM": "32GB LPDDR5",
        "Connectivity": "Wi-Fi 6E, Bluetooth 5.3, USB-C",
        "Audio": "4-mic array, stereo speakers",
        "Camera": "4K with privacy shutter",
        "Power": "45W USB-C charging",
        "Dimensions": "15cm x 10cm x 3cm"
      }
    },
    {
      name: "AetherArena",
      tagline: "Self-Improving AI Platform",
      description: "Brain-like architecture that learns and adapts. Enterprise-grade AI platform for serious computing power.",
      category: "Enterprise Software",
      price: "From £15,000/year",
      availability: "Beta Q2 2025",
      icon: <Server className="h-8 w-8" />,
      color: "slate",
      features: [
        "Self-improving neural architecture",
        "Brain-inspired learning modules", 
        "Scalable computing cluster support",
        "Custom model training pipeline",
        "Enterprise security compliance",
        "API & SDK for developers",
        "Multi-tenant architecture",
        "Advanced analytics dashboard"
      ],
      useCases: [
        "Hospitals processing medical imaging",
        "Schools providing personalized education",
        "Enterprises automating complex workflows",
        "Research institutions running AI experiments"
      ],
      specifications: {
        "Architecture": "Distributed microservices",
        "Models": "LLama, GPT-4 compatible APIs",
        "Deployment": "On-premise, hybrid cloud",
        "Security": "SOC 2, HIPAA, GDPR compliant",
        "Scaling": "Auto-scaling clusters",
        "APIs": "RESTful, GraphQL, WebSocket",
        "Monitoring": "Real-time performance metrics",
        "Support": "24/7 enterprise support"
      }
    }
  ];



  return (
    <section className="relative bg-transparent py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>
      
      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <Badge variant="outline" className="text-gray-300 border-gray-500/30 px-4 py-2 text-sm font-semibold backdrop-blur-sm mb-6">
            Product Vision
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            GURU & AetherArena
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Two revolutionary products defining the future of privacy-first AI. 
            From personal assistants to enterprise platforms - we're building the entire ecosystem.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.2 }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="relative group"
            >
              <Card className={`bg-transparent border-white/10 hover:border-${product.color}-400/30 transition-all duration-300 h-full`}>
                <div className="p-8">
                  {/* Product Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${product.color}-400 to-${product.color}-600 flex items-center justify-center text-white shadow-lg shadow-${product.color}-400/25`}>
                      {product.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                      <p className={`text-${product.color}-400 font-medium`}>{product.tagline}</p>
                      <Badge variant="outline" className={`mt-1 text-xs text-gray-400 border-gray-600`}>
                        {product.category}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Pricing & Availability */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="outline" className={`text-${product.color}-400 border-${product.color}-400/30`}>
                      {product.price}
                    </Badge>
                    <Badge variant="outline" className="text-gray-400 border-gray-600">
                      {product.availability}
                    </Badge>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.features.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className={`h-4 w-4 text-${product.color}-400 flex-shrink-0`} />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="outline" 
                    className={`w-full border-${product.color}-400/30 text-${product.color}-400 hover:bg-${product.color}-400/10`}
                    asChild
                  >
                    <Link href={`/products/${product.name.toLowerCase()}`}>
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>



        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20 text-center"
        >
          <Card className="bg-transparent border-white/10">
            <div className="p-8">
              <BrainCircuit className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-white mb-4">Our Vision</h4>
              <p className="text-gray-300 text-lg leading-relaxed">
                "To democratize AI access through privacy-first solutions that put users in control of their data. 
                Every interaction should be private, every computation should be local, and every person should have access to the most advanced AI technology - without compromising their privacy or security."
              </p>
              <div className="flex items-center justify-center gap-2 mt-6">
                <span className="text-gray-400 text-sm">— Krish Dokania, CEO & Founder</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
} 