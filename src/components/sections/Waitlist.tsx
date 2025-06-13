"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight, XCircle, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';
import { ShineBorder } from '@/components/magicui/shine-border';

// Waitlist props type
interface WaitlistProps {
  waitlistRef: React.RefObject<HTMLElement | null>;
}

// Waitlist form data type
interface FormData {
  name: string;
  email: string;
  reason: string;
  useCase: string;
  earlyAccess: boolean;
}

export default function Waitlist({ waitlistRef }: WaitlistProps) {
  const titleRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    reason: '',
    useCase: '',
    earlyAccess: true
  });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  

  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      setFormState('error');
      return;
    }
    
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name');
      setFormState('error');
      return;
    }
    
    try {
      setFormState('submitting');
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }
      
      // Successfully joined waitlist
      setFormState('success');
      setFormData({
        name: '',
        email: '',
        reason: '',
        useCase: '',
        earlyAccess: true
      });
      
      // Clear form state after 5 seconds
      setTimeout(() => {
        setFormState('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Waitlist error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      setFormState('error');
    }
  };
  
  return (
    <section ref={waitlistRef} data-section="waitlist" className="relative bg-black py-24 md:py-32 overflow-hidden">
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
      
      {/* Additional pattern */}
      <div className="absolute inset-0 z-[1] opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-6">
            <ShineBorder 
              className="absolute inset-0 rounded-full" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.4)"]}
              duration={8}
            />
            <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-black/30">
              <Users className="w-4 h-4 mr-2" />
              Join the Revolution
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Join the <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">Waitlist</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience GURU, the revolutionary AI companion by AetherInc founded by Krish Dokania and Adrian Wong. 
            Reserve your spot to be among the first to own your personal AI assistant for real-world tasks.
          </p>
        </motion.div>
        
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <ShineBorder 
              className="absolute inset-0 rounded-2xl opacity-60" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.5)"]}
              duration={15}
            />
            <Card className="relative p-8 bg-black/60 border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-white text-center">Reserve Your Device</h3>
              
              {/* Success Message */}
              {formState === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 p-4 rounded-lg bg-green-900/20 border border-green-500/20 text-center"
                >
                  <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-green-400">Thank you for joining our waitlist!</p>
                  <p className="text-gray-400 text-sm mt-1">We'll notify you when early access opens.</p>
                </motion.div>
              )}
              
              {/* Error Message */}
              {formState === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-500/20 text-center"
                >
                  <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="text-red-400">{errorMessage}</p>
                </motion.div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="bg-black/40 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40 focus:ring-white/20"
                      disabled={formState === 'submitting'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-black/40 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40 focus:ring-white/20"
                      disabled={formState === 'submitting'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                      Why are you interested in GURU? (Optional)
                    </label>
                    <Textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Tell us about your use case..."
                      className="bg-black/40 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40 focus:ring-white/20 min-h-[100px]"
                      disabled={formState === 'submitting'}
                    />
                  </div>
                  
                  <div className="relative">
                    <ShineBorder 
                      className="absolute inset-0 rounded-lg opacity-80" 
                      borderWidth={1}
                      shineColor={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.6)"]}
                      duration={10}
                    />
                    <Button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="relative w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-base transform hover:scale-[1.02] shadow-lg"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full mr-2"
                          />
                          Joining Waitlist...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Join the Waitlist
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-xs">
                  By joining, you agree to receive updates about GURU and AetherInc. Unsubscribe anytime.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 