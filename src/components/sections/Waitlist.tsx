"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section ref={waitlistRef} className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-gray-900/30 to-black/90 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Join the Waitlist
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience GURU, the revolutionary AI companion by AetherInc founded by Krish Dokania and Adrian Wong. Reserve your spot to be among the first to own your personal AI assistant for real-world tasks.
          </p>
        </motion.div>
        
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-container p-8 rounded-2xl border border-white/10 shadow-glow-subtle"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Reserve Your Device</h3>
            
            {/* Success Message */}
            {formState === 'success' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10 text-center"
              >
                <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-white/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-white">Thank you for joining our waitlist!</p>
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
              <div className="space-y-4">
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
                    className="bg-white/5 border-white/10 text-white"
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
                    className="bg-white/5 border-white/10 text-white"
                    disabled={formState === 'submitting'}
                  />
                </div>
                
                <div>
                  <label htmlFor="useCase" className="block text-sm font-medium text-gray-300 mb-2">
                    How will you use our product?
                  </label>
                  <select
                    id="useCase"
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleChange}
                    className="w-full rounded-md bg-white/5 border-white/10 text-white py-2 px-3"
                    disabled={formState === 'submitting'}
                  >
                    <option value="" className="bg-gray-900">Select an option</option>
                    <option value="personal" className="bg-gray-900">Personal Use</option>
                    <option value="business" className="bg-gray-900">Business</option>
                    <option value="education" className="bg-gray-900">Education</option>
                    <option value="research" className="bg-gray-900">Research</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                    Why are you interested in our technology? (optional)
                  </label>
                  <Textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Tell us more about your interest..."
                    className="bg-white/5 border-white/10 text-white"
                    disabled={formState === 'submitting'}
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="earlyAccess"
                    name="earlyAccess"
                    checked={formData.earlyAccess}
                    onChange={handleCheckboxChange}
                    className="rounded text-cyan-500 bg-white/5 border-white/10 mr-2"
                    disabled={formState === 'submitting'}
                  />
                  <label htmlFor="earlyAccess" className="text-sm text-gray-300">
                    I want to be considered for early access
                  </label>
                </div>
                
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center"
                  disabled={formState === 'submitting'}
                >
                  {formState === 'submitting' ? (
                    <>
                      <span className="animate-pulse">Processing...</span>
                    </>
                  ) : (
                    <>
                      Join the Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 