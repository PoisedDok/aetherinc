"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight, XCircle, Sparkles, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShineBorder } from '@/components/magicui/shine-border';
import { useAnalyticsTracking } from '@/lib/hooks/useAnalyticsTracking';
import { TrackedButton } from '@/components/ui/tracked-button';

// Waitlist props type
interface WaitlistProps {
  waitlistRef: React.RefObject<HTMLElement>;
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
  const { trackEvent } = useAnalyticsTracking();
  
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
  // Email validation helper
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setFormState('error');
      trackEvent('waitlist_error', { elementName: 'Email validation error' })();
      return;
    }
    
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name');
      setFormState('error');
      trackEvent('waitlist_error', { elementName: 'Name validation error' })();
      return;
    }
    
    try {
      // Get the base URL from window location to handle Docker environment correctly
      const baseUrl = window.location.origin;
      
      setFormState('submitting');
      trackEvent('waitlist_submission_start', { elementName: 'Waitlist form submission started' })();
      
      const response = await fetch(`${baseUrl}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          reason: formData.reason,
          useCase: formData.useCase,
          earlyAccess: formData.earlyAccess,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }
      
      // Successfully joined waitlist
      setFormState('success');
      trackEvent('waitlist_submission_success', { elementName: 'Waitlist form submission successful' })();
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
      trackEvent('waitlist_submission_error', { elementName: `Waitlist form error: ${error instanceof Error ? error.message : 'Unknown error'}` })();
    }
  };
  
  return (
    <section ref={waitlistRef as React.RefObject<HTMLElement>} data-section="waitlist" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background layers removed to allow Jarvis background to show through */}
      
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
          
          <h2 className="text-4xl font-bold mb-6 text-white">
            Reserve Your Private AI Paralegal
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience GURU, the privacy-first AI by AetherInc founded by Krish Dokania. 
            Reserve your spot to be among the first law firms to own your personal AI paralegal for confidential document workflows.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
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
            <Card className="relative p-10 lg:p-12 bg-black/60 border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-8 text-white text-center">Book Your Legal Pilot</h3>
              
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
                <div className="space-y-8">
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
                      className="bg-black/40 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40 focus:ring-white/20 py-4"
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
                      className="bg-black/40 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40 focus:ring-white/20 py-4"
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
                      className="bg-black/40 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40 focus:ring-white/20 min-h-[120px] py-4"
                      disabled={formState === 'submitting'}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <TrackedButton
                      type="submit"
                      className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-7 px-10 rounded-xl transition-all duration-300 text-xl h-auto transform hover:scale-[1.02] flex items-center justify-center gap-2"
                      disabled={formState === 'submitting'}
                      trackingId="waitlist_join_button"
                      trackingName="Waitlist Join Button"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Reserve Legal Pilot</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </TrackedButton>
                    
                    <p className="text-center text-gray-500 text-xs mt-4">
                      By joining, you agree to receive updates about our products and services.
                      <br />We respect your privacy and will never share your information.
                    </p>
                  </div>
                </div>
              </form>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm">
              <Sparkles className="inline-block w-4 h-4 mr-1 text-yellow-400" />
              <span className="font-medium">Limited availability</span> — Only 1000 devices in first batch
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 