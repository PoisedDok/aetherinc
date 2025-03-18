"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight, XCircle, Terminal, Bot, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Sample use cases for icon cloud
const useCases = [
  { icon: <Terminal className="h-5 w-5" />, label: "Command Line" },
  { icon: <Bot className="h-5 w-5" />, label: "AI Assistant" },
  { icon: <Sparkles className="h-5 w-5" />, label: "Knowledge Base" },
  { icon: <Users className="h-5 w-5" />, label: "Collaboration" },
];

// Terminal commands for demo
const demoCommands = [
  {
    command: "guru search recent documents about project alpha",
    response: "Found 3 recent documents related to Project Alpha:\n1. project_alpha_specs.md (modified 2 days ago)\n2. alpha_budget_2025.xlsx (modified yesterday)\n3. alpha_team_meeting_notes.txt (modified today)"
  },
  {
    command: "guru summarize meeting notes",
    response: "Summary of alpha_team_meeting_notes.txt:\n• Development timeline extended by 2 weeks\n• New UX improvements approved by stakeholders\n• Budget increase of 15% allocated for Q3\n• Next milestone review scheduled for June 15th"
  },
  {
    command: "guru create task list from meeting",
    response: "Created 4 tasks in your workspace:\n✓ Update project timeline in management system\n✓ Notify design team about UX change approvals\n✓ Submit budget adjustment request to finance\n✓ Schedule milestone review meeting for June 15th"
  }
];

// Waitlist props type
interface WaitlistProps {
  innerRef: React.RefObject<HTMLElement | null>;
}

// Waitlist form data type
interface FormData {
  name: string;
  email: string;
  reason: string;
  useCase: string;
  earlyAccess: boolean;
}

export default function Waitlist({ innerRef }: WaitlistProps) {
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
  
  // Terminal state
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  
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
  
  // Simulate terminal typing effect
  React.useEffect(() => {
    if (currentCommand >= demoCommands.length) {
      // Reset after all commands
      setTimeout(() => {
        setCurrentCommand(0);
        setTypedText("");
        setIsTyping(true);
        setShowResponse(false);
      }, 5000);
      return;
    }
    
    if (isTyping) {
      const command = demoCommands[currentCommand].command;
      if (typedText.length < command.length) {
        // Continue typing
        const timer = setTimeout(() => {
          setTypedText(prev => command.substring(0, prev.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        // Finished typing, show response
        setIsTyping(false);
        const timer = setTimeout(() => {
          setShowResponse(true);
          
          // Move to next command after delay
          setTimeout(() => {
            if (currentCommand < demoCommands.length - 1) {
              setCurrentCommand(prev => prev + 1);
              setTypedText("");
              setIsTyping(true);
              setShowResponse(false);
            }
          }, 3000);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentCommand, isTyping, typedText]);
  
  return (
    <section ref={innerRef} className="py-24 bg-black relative overflow-hidden">
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
            Experience GURU's revolutionary AI technology. Reserve your spot in our exclusive early access program.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="max-w-lg mx-auto lg:mx-0 lg:ml-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-container p-8 rounded-2xl border border-white/10 shadow-glow-subtle"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Reserve Your GURU</h3>
              
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
                      placeholder="John Doe"
                      className="glass-input w-full"
                      required
                      disabled={formState === 'submitting' || formState === 'success'}
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
                      placeholder="you@example.com"
                      className="glass-input w-full"
                      required
                      disabled={formState === 'submitting' || formState === 'success'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="useCase" className="block text-sm font-medium text-gray-300 mb-2">
                      Primary Use Case
                    </label>
                    <select
                      id="useCase"
                      name="useCase"
                      value={formData.useCase}
                      onChange={handleChange}
                      className="glass-input w-full h-10 rounded-md"
                      disabled={formState === 'submitting' || formState === 'success'}
                    >
                      <option value="" disabled>Select primary use case</option>
                      <option value="personal">Personal Assistant</option>
                      <option value="work">Work Productivity</option>
                      <option value="creative">Creative Projects</option>
                      <option value="research">Research</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                      Why Are You Interested in GURU?
                    </label>
                    <Textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Tell us why you're excited about GURU and how you plan to use it..."
                      className="glass-input w-full min-h-[100px]"
                      disabled={formState === 'submitting' || formState === 'success'}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="earlyAccess"
                      name="earlyAccess"
                      checked={formData.earlyAccess}
                      onChange={handleCheckboxChange}
                      className="rounded bg-white/5 border-white/20 text-white"
                      disabled={formState === 'submitting' || formState === 'success'}
                    />
                    <label htmlFor="earlyAccess" className="text-sm text-gray-300">
                      I'm interested in early access (15% discount)
                    </label>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full mt-6 bg-white hover:bg-white/90 text-black font-semibold py-3 px-8 rounded-full transition duration-300 shadow-glow-subtle h-auto flex justify-center items-center gap-2"
                  disabled={formState === 'submitting' || formState === 'success'}
                >
                  {formState === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : formState === 'success' ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Joined
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Join Waitlist
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
                
                <p className="mt-6 text-sm text-gray-400 text-center">
                  By joining, you agree to receive updates about GURU. 
                  We'll never share your data with third parties.
                </p>
              </form>
            </motion.div>
          </div>
          
          {/* AI Capabilities Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col space-y-8"
          >
            <div className="glass-container p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-white">GURU Agentic Capabilities</h3>
              
              <div className="bg-gray-900/30 p-4 rounded-xl flex flex-wrap justify-center">
                {useCases.map((item, index) => (
                  <div key={index} className="flex items-center m-2 p-3 bg-white/5 rounded-lg gap-2 transition-all hover:bg-white/10">
                    <div className="bg-white/10 p-2 rounded-full">
                      {item.icon}
                    </div>
                    <span className="text-white">{item.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <p className="text-gray-300 mb-4">
                  GURU's advanced agentic capabilities help you manage your workspace with unprecedented efficiency:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                    <span>Advanced natural language understanding for complex commands</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                    <span>Contextual awareness of your workspace and projects</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                    <span>Proactive assistance based on your workflow patterns</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="glass-container p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-white">See GURU in Action</h3>
              <div className="bg-black/60 rounded-lg overflow-hidden p-4 h-[300px] font-mono text-sm">
                <div className="flex items-center justify-between border-b border-green-900/30 pb-2 mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-green-600">GURU Terminal</div>
                </div>
                
                <div className="h-[calc(100%-2rem)] overflow-y-auto">
                  <div className="text-green-600 mb-4">
                    <p>AetherInc GURU Terminal v1.0.0</p>
                    <p>Type 'help' for list of available commands</p>
                    <p className="mb-2">------------------------------------</p>
                  </div>
                  
                  {/* Previous commands */}
                  {demoCommands.slice(0, currentCommand).map((cmd, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex">
                        <span className="text-green-600 mr-2">{">"}</span>
                        <span className="text-white">{cmd.command}</span>
                      </div>
                      <div className="text-green-400 ml-4 mt-1 whitespace-pre-line">{cmd.response}</div>
                    </div>
                  ))}
                  
                  {/* Current command */}
                  {currentCommand < demoCommands.length && (
                    <div className="mb-4">
                      <div className="flex">
                        <span className="text-green-600 mr-2">{">"}</span>
                        <span className="text-white">{typedText}</span>
                        {isTyping && <span className="animate-pulse ml-0.5">█</span>}
                      </div>
                      
                      {showResponse && (
                        <div className="text-green-400 ml-4 mt-1 whitespace-pre-line">
                          {demoCommands[currentCommand].response}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center text-gray-400 text-sm"
        >
          <p>Limited quantities available for early access program. Expected shipping Q3 2025.</p>
        </motion.div>
      </div>
    </section>
  );
}

// Testimonial component
interface TestimonialProps {
  quote: string;
  author: string;
  title: string;
}

const Testimonial = ({ quote, author, title }: TestimonialProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    className="glass-effect p-6 rounded-xl relative"
  >
    <div className="absolute top-4 left-4 text-4xl text-white/10">"</div>
    <div className="pt-4">
      <p className="text-gray-300 mb-6 relative z-10">"{quote}"</p>
      <div className="flex items-center">
        <div className="ml-3">
          <div className="font-semibold text-white">{author}</div>
          <div className="text-sm text-white/70">{title}</div>
        </div>
      </div>
    </div>
  </motion.div>
); 