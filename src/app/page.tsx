"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real implementation, you would send this to your API
    console.log('Email submitted:', email);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          {/* Background pattern effect */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="mb-6 inline-block">
            <Image 
              src="/logo.jpg" 
              alt="Aether Inc. Logo" 
              width={180} 
              height={60} 
              className="mx-auto"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Meet <span className="text-cyan-400">GURU</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            The world's first truly private AI assistant.
            <span className="block mt-2 text-cyan-300 font-medium">Coming Soon</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg">
              Learn More
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white border border-white font-semibold py-3 px-8 rounded-full transition duration-300">
              Join Waitlist
            </button>
          </div>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <div className="animate-bounce p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            A Revolution in <span className="text-cyan-400">Privacy-First AI</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-xl shadow-lg transform transition duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Privacy-First AI</h3>
              <p className="text-gray-300">
                Own your data. GURU processes everything on your device, ensuring your information never leaves your control.
              </p>
            </div>
            
            <div className="bg-slate-800 p-8 rounded-xl shadow-lg transform transition duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Real-Time Edge Computing</h3>
              <p className="text-gray-300">
                Experience instant AI inference with ultra-low latency. No more waiting for cloud processing or connectivity issues.
              </p>
            </div>
            
            <div className="bg-slate-800 p-8 rounded-xl shadow-lg transform transition duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Modular Hardware</h3>
              <p className="text-gray-300">
                Customize GURU with modular peripherals like cameras, sensors, and microphones to fit your unique needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About/Vision Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative h-80 w-full rounded-xl overflow-hidden bg-slate-700">
                {/* Placeholder for product image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-cyan-500/30 rounded-full flex items-center justify-center">
                    <span className="text-cyan-400 text-3xl font-bold">GURU</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-6">
                Our Vision for a <span className="text-cyan-400">Better Tomorrow</span>
              </h2>
              
              <p className="text-gray-300 mb-6">
                At Aether Inc., we're deeply committed to sustainability, user empowerment, and long-term technological progress. GURU represents our belief that AI should enhance human potential without compromising privacy or the planet.
              </p>
              
              <p className="text-gray-300 mb-6">
                We're building technology that bridges gaps in education, healthcare, industry, and everyday life—all while maintaining a minimal environmental footprint.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <span className="bg-slate-700 text-cyan-400 px-4 py-2 rounded-full text-sm">Sustainability</span>
                <span className="bg-slate-700 text-cyan-400 px-4 py-2 rounded-full text-sm">Data Ownership</span>
                <span className="bg-slate-700 text-cyan-400 px-4 py-2 rounded-full text-sm">User Empowerment</span>
                <span className="bg-slate-700 text-cyan-400 px-4 py-2 rounded-full text-sm">Technological Progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            Transforming <span className="text-cyan-400">Industries</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Enterprise</h3>
              <p className="text-gray-300 text-sm">
                Secure AI solutions for business intelligence, analytics, and process optimization without data leaving your premises.
              </p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Healthcare</h3>
              <p className="text-gray-300 text-sm">
                HIPAA-compliant AI assistant that keeps sensitive patient data secure while enhancing diagnostic capabilities.
              </p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Education</h3>
              <p className="text-gray-300 text-sm">
                Personalized learning assistants that protect student data while providing tailored educational experiences.
              </p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Manufacturing</h3>
              <p className="text-gray-300 text-sm">
                Real-time edge AI for predictive maintenance, quality control, and production optimization without cloud dependency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-tr from-indigo-950 to-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            <span className="text-cyan-400">How GURU</span> Works
          </h2>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-500/30 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="relative bg-slate-800/80 p-6 rounded-xl border border-slate-700 text-center">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-lg font-semibold text-white mb-4 mt-4">On-Device Processing</h3>
                <p className="text-gray-300">
                  GURU processes all AI tasks locally on your device, ensuring your data never leaves your control.
                </p>
              </div>
              
              <div className="relative bg-slate-800/80 p-6 rounded-xl border border-slate-700 text-center">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-lg font-semibold text-white mb-4 mt-4">Instant Inference</h3>
                <p className="text-gray-300">
                  Experience ultra-low latency responses with GURU's optimized edge computing architecture.
                </p>
              </div>
              
              <div className="relative bg-slate-800/80 p-6 rounded-xl border border-slate-700 text-center">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-lg font-semibold text-white mb-4 mt-4">Modular Expansion</h3>
                <p className="text-gray-300">
                  Enhance capabilities with modular peripherals that easily connect to your GURU device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 p-8 md:p-12 rounded-2xl border border-cyan-500/30">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Be Part of the <span className="text-cyan-400">Future</span>
            </h2>
            
            <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
              Join us on our journey toward a privacy-centric, AI-driven future. Sign up to be among the first to experience GURU and receive exclusive updates.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow py-3 px-4 bg-slate-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
                >
                  {submitted ? "Thanks!" : "Stay Informed"}
                </button>
              </div>
            </form>
            
            <div className="flex justify-center mt-8 gap-6">
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image 
                src="/logo-aether.svg" 
                alt="Aether Inc. Logo" 
                width={120} 
                height={40} 
                className="mx-auto md:mx-0"
              />
              <p className="mt-2 text-sm">© 2025 Aether Inc. All rights reserved.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <Link href="#" className="hover:text-cyan-400 transition">About</Link>
              <Link href="#" className="hover:text-cyan-400 transition">Products</Link>
              <Link href="#" className="hover:text-cyan-400 transition">Careers</Link>
              <Link href="#" className="hover:text-cyan-400 transition">Blog</Link>
              <Link href="#" className="hover:text-cyan-400 transition">Contact</Link>
              <Link href="#" className="hover:text-cyan-400 transition">Privacy</Link>
              <Link href="#" className="hover:text-cyan-400 transition">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}