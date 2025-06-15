"use client";

import React, { useState } from 'react';
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ShineBorder } from '@/components/magicui/shine-border';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, Mail, MapPin, Calendar, Clock, Users, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Combine first and last name for the API
      const name = `${formState.firstName} ${formState.lastName}`.trim();
      
      // Prepare data for API
      const contactData = {
        name,
        email: formState.email,
        company: formState.company,
        subject: `Contact Form: ${formState.interest || 'General Inquiry'}`,
        message: formState.message,
        serviceType: formState.interest
      };

      // Send data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (result.success) {
        // Reset form
        setFormState({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          interest: '',
          message: ''
        });
        alert("Message sent successfully! We'll get back to you soon.");
      } else {
        alert(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      
      <main className="pt-28">
        {/* Page Header */}
        <section className="relative py-24 px-4 bg-transparent overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-30">
          </div>

          {/* Gradient overlay removed to allow Jarvis background to show through */}

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
                <Button asChild variant="ghost" size="sm" className="relative text-gray-400 hover:text-white border border-white/10">
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
                <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Contact Us
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">Touch</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Ready to explore privacy-first AI solutions? Let's discuss how AetherInc can transform your business.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="relative py-24 px-4 bg-transparent">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-25">
          </div>

          {/* Gradient overlay removed for transparency */}

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={12}
                />
                <Card className="relative border-white/10 p-8 transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6 text-white">Send us a Message</h2>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">First Name</label>
                        <input 
                          type="text" 
                          name="firstName"
                          value={formState.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none text-white placeholder-gray-500"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Last Name</label>
                        <input 
                          type="text" 
                          name="lastName"
                          value={formState.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none text-white placeholder-gray-500"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none text-white placeholder-gray-500"
                        placeholder="your.email@company.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Company</label>
                      <input 
                        type="text" 
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none text-white placeholder-gray-500"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Interest</label>
                      <select 
                        name="interest"
                        value={formState.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none text-white"
                      >
                        <option value="" className="bg-black">Select your interest</option>
                        <option value="guru" className="bg-black">GURU AI Assistant</option>
                        <option value="consulting" className="bg-black">AI Consulting</option>
                        <option value="arena" className="bg-black">AetherArena Platform</option>
                        <option value="partnership" className="bg-black">Partnership</option>
                        <option value="other" className="bg-black">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                      <textarea 
                        rows={4}
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none resize-none text-white placeholder-gray-500"
                        placeholder="Tell us about your AI needs and how we can help..."
                      />
                    </div>
                    
                    <div className="relative">
                      <ShineBorder 
                        className="absolute inset-0 rounded-full opacity-100" 
                        borderWidth={2}
                        shineColor={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.7)"]}
                        duration={10}
                      />
                      <Button type="submit" size="lg" className="relative bg-white hover:bg-gray-100 text-black w-full px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300" disabled={isSubmitting}>
                        Send Message <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="relative group">
                  <ShineBorder 
                    className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                    duration={14}
                  />
                  <Card className="relative border-white/10 p-8 transition-all duration-300">
                    <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-6 w-6 text-white/80" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 text-white">Location</h3>
                          <p className="text-gray-400">Glasgow, Scotland<br />United Kingdom</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="h-6 w-6 text-white/80" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 text-white">Email</h3>
                          <p className="text-gray-400">info@aetherinc.xyz</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="h-6 w-6 text-white/80" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 text-white">Business Hours</h3>
                          <p className="text-gray-400">Monday - Friday<br />9:00 AM - 6:00 PM GMT</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="relative group">
                  <ShineBorder 
                    className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                    duration={16}
                  />
                  <Card className="relative border-white/10 p-8 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-4 text-white">Quick Actions</h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <ShineBorder 
                          className="absolute inset-0 rounded-full" 
                          borderWidth={1}
                          shineColor={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.4)"]}
                          duration={12}
                        />
                        <Button asChild variant="outline" size="lg" className="relative border-white/30 text-white hover:bg-white/10 bg-black/30 backdrop-blur-sm w-full justify-start px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300">
                          <Link href="/products">
                            <Calendar className="mr-3 h-5 w-5" />
                            Schedule Demo
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
                        <Button asChild variant="outline" size="lg" className="relative border-white/30 text-white hover:bg-white/10 bg-black/30 backdrop-blur-sm w-full justify-start px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300">
                          <Link href="/services">
                            <Users className="mr-3 h-5 w-5" />
                            Book Consultation
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Company Info */}
                <div className="relative group">
                  <ShineBorder 
                    className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                    borderWidth={1}
                    shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                    duration={18}
                  />
                  <Card className="relative border-white/10 p-6 transition-all duration-300">
                    <h3 className="text-lg font-bold mb-4 text-white">Company Details</h3>
                    <div className="text-sm text-gray-400 space-y-2">
                      <p><strong className="text-gray-300">Company:</strong> AetherInc Limited</p>
                      <p><strong className="text-gray-300">Registration:</strong> SC851680</p>
                      <p><strong className="text-gray-300">Founded:</strong> June 10, 2025</p>
                      <p><strong className="text-gray-300">Location:</strong> Glasgow, Scotland</p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-24 px-4 bg-transparent">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-25">
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/30 to-black z-[1]" />

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">Questions</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={12}
                />
                <Card className="relative border-white/10 p-6 transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-3 text-white">How quickly can you respond to inquiries?</h3>
                  <p className="text-gray-400">We typically respond to all inquiries within 24 hours during business days. For urgent matters, please mention "URGENT" in your subject line.</p>
                </Card>
              </div>

              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={14}
                />
                <Card className="relative border-white/10 p-6 transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-3 text-white">Do you offer free consultations?</h3>
                  <p className="text-gray-400">Yes! We offer a complimentary 30-minute consultation to discuss your AI needs and how our privacy-first solutions can benefit your business.</p>
                </Card>
              </div>

              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={16}
                />
                <Card className="relative border-white/10 p-6 transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-3 text-white">What makes AetherInc different from other AI companies?</h3>
                  <p className="text-gray-400">Our privacy-first approach ensures all AI processing happens locally on your devices. Your data never leaves your control, providing enterprise-grade security with cutting-edge AI capabilities.</p>
                </Card>
              </div>

              <div className="relative group">
                <ShineBorder 
                  className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  borderWidth={1}
                  shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                  duration={18}
                />
                <Card className="relative border-white/10 p-6 transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-3 text-white">Can I schedule a product demonstration?</h3>
                  <p className="text-gray-400">Absolutely! We'd love to show you GURU and AetherArena in action. Use the contact form above or click "Schedule Demo" to book a personalized demonstration.</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4 bg-transparent overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-25">
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/30 to-black z-[1]" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Start Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">AI Journey?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Join the privacy-first AI revolution. Let's build the future together.
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