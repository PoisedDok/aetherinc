"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { Button } from '@/components/ui/button';

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <RetroGrid 
          className="h-full w-full"
          cellSize={80}
          opacity={0.3}
          angle={-10}
          lightLineColor="rgba(255, 255, 255, 0.05)"
          darkLineColor="rgba(255, 255, 255, 0.03)"
        />
      </div>
      
      <div className="relative z-10 max-w-3xl w-full mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Coming Soon
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-lg text-gray-300 mb-8">
            We're working hard to bring you something amazing. 
            Check back soon for updates!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/">
            <Button className="bg-white/10 hover:bg-white/20 text-white font-medium rounded-full px-6 py-2">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 