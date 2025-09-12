"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShineBorder } from '@/components/magicui/shine-border';
import {
  FileText,
  Eye,
  Scale,
  Lock,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function LegalHighlights() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });


  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <motion.div 
        ref={sectionRef}
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >


        {/* Risk-Free Promise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-12"
        >
          <div className="relative max-w-3xl mx-auto">
            <ShineBorder
              className="absolute inset-0 rounded-2xl opacity-70"
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.5)"]}
              duration={20}
            />
            <Card className="relative p-6 bg-transparent border-white/10 backdrop-blur-sm">
              <div className="text-center">
                <Lock className="h-8 w-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Your Data Could Never Leave Your Office</h3>
                <p className="text-gray-300 text-sm max-w-xl mx-auto">
                  No cloud uploads. No third-party servers. No data sharing. Your most sensitive documents could stay exactly where they belong—under your control.
                </p>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
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
                className="relative w-full sm:w-auto bg-white hover:bg-gray-100 text-black font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 text-base h-auto min-w-[200px] sm:min-w-[200px] transform hover:scale-105"
                size="lg"
              >
                  <Link href="/legal">
                  See How It Works
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
                className="relative w-full sm:w-auto bg-black/30 hover:bg-black/50 text-white border border-white/30 font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 text-base h-auto backdrop-blur-md min-w-[200px] sm:min-w-[200px] transform hover:scale-105"
                size="lg"
              >
                <Link href="/contact">Start Risk-Free Trial</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
