"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShineBorder } from '@/components/magicui/shine-border';
import { Scale, Shield, FileText, Gavel, BookOpen, Lock, CheckCircle, CloudOff, Cpu } from 'lucide-react';

export default function LegalMission() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [playCount, setPlayCount] = useState(0);
  const [isUserControlled, setIsUserControlled] = useState(false);

  // Auto-play video when in view (with limits)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isUserControlled && playCount === 0) {
            // Video is in view, try to play (only once)
            video.play().catch(() => {
              // Autoplay failed (likely due to browser policies requiring user interaction), user can still click to play
              console.log('Autoplay prevented by browser, user can click to play');
            });
          } else if (!entry.isIntersecting) {
            // Video is out of view, pause it
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // 50% of video needs to be visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before video is fully out of view
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [playCount, isUserControlled]);

  // Track play count and user interactions
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      if (!isUserControlled) {
        setPlayCount(prev => prev + 1);
      }
    };

    const handleUserInteraction = () => {
      setIsUserControlled(true);
    };

    const handleEnded = () => {
      // Video has ended - no looping allowed
      console.log('Video ended');
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('click', handleUserInteraction);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('click', handleUserInteraction);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isUserControlled, playCount]);

  // Handle video click to toggle play/pause
  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    setIsUserControlled(true);
  };

  const legalChallenges = [
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: "Privacy Risks",
      description: "Legal documents contain sensitive client information. Most AI tools require uploading to the cloud, creating data breach risks that can destroy your practice and client trust.",
      color: "blue"
    },
    {
      icon: <FileText className="h-8 w-8 text-green-400" />,
      title: "Complex Legal Language",
      description: "Legal documents use precise, technical language that general AI tools don't understand. They miss critical details and legal relationships that matter.",
      color: "green"
    },
    {
      icon: <Scale className="h-8 w-8 text-yellow-400" />,
      title: "Professional Standards",
      description: "Law firms must follow strict ethical rules and compliance standards. Standard AI tools aren't designed with legal professional requirements in mind.",
      color: "yellow"
    }
  ];


  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <motion.div 
        ref={sectionRef}
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-6">
            <ShineBorder 
              className="absolute inset-0 rounded-full" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"]}
              duration={12}
            />
              <Badge variant="outline" className="relative text-white/90 border-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm bg-black/30">
              <Scale className="w-4 h-4 mr-2" />
              Legal AI Solution
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Legal Work Needs <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">Better AI</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Standard AI tools risk your client data and miss legal details. Imagine having a different approach with privacy-first design for legal document analysis.
          </p>
        </div>

        {/* Legal Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {legalChallenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <ShineBorder 
                className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)"]}
                duration={15 + index * 2}
              />
              <Card className="relative h-full p-8 bg-transparent border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-white/5 hover:bg-white/5 group-hover:scale-[1.02] min-h-[480px]">
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-white/5 mb-6">
                    {challenge.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-6">{challenge.title}</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow text-base">{challenge.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Company Mission for Legal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-5xl mx-auto mb-20 relative"
        >
          <div className="relative">
            <ShineBorder 
              className="absolute inset-0 rounded-2xl opacity-70" 
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.5)"]}
              duration={20}
            />
            <Card className="relative p-8 md:p-12 bg-transparent border-white/10 backdrop-blur-sm">
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                  Imagine Solving Real Legal Problems
                </h3>
                <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                  <p>
                    <strong>Lawyers deserve better AI.</strong> Consider how legal professionals could work differently—spending less time on routine analysis while keeping sensitive client data completely protected locally.
                  </p>
                  <p>
                    <strong>GURU could keep everything local.</strong> Your documents could stay in your office. Imagine focusing on what matters: accurate analysis, complete privacy, and practical results for real legal work.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* GURU vs Traditional Legal AI */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="relative mb-24"
        >
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
              GURU vs Traditional Legal AI
            </h3>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Most legal AI tools compromise on privacy, cost, or control. Imagine a solution that could deliver the complete package without the trade-offs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* GURU Card */}
            <div className="relative group">
              <ShineBorder
                className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.1)", "rgba(34, 197, 94, 0.4)"]}
                duration={18}
              />
              <Card className="relative h-full p-8 bg-transparent border-white/10 hover:border-green-400/50 transition-all duration-300 shadow-lg shadow-white/5 hover:bg-green-900/20 hover:shadow-green-500/10 group-hover:scale-[1.02] min-h-[420px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-white/5 group-hover:border-green-400/40 group-hover:bg-green-500/20">
                      <Cpu className="h-8 w-8 text-gray-400 group-hover:text-green-400 transition-colors duration-300" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-2xl font-bold text-white">GURU</h4>
                      <p className="text-gray-400 group-hover:text-green-400 text-sm font-medium transition-colors duration-300">Local AI Solution</p>
                    </div>
                  </div>

                  <div className="space-y-4 flex-grow">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 group-hover:text-green-400 mt-0.5 flex-shrink-0 transition-colors duration-300" />
                      <div>
                        <p className="text-white font-medium">Complete Privacy</p>
                        <p className="text-gray-300 text-sm">Documents stay on your computer, no cloud uploads</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 group-hover:text-green-400 mt-0.5 flex-shrink-0 transition-colors duration-300" />
                      <div>
                        <p className="text-white font-medium">No Subscription Fees</p>
                        <p className="text-gray-300 text-sm">One-time purchase, no monthly API costs</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 group-hover:text-green-400 mt-0.5 flex-shrink-0 transition-colors duration-300" />
                      <div>
                        <p className="text-white font-medium">Legal Expertise</p>
                        <p className="text-gray-300 text-sm">Designed for contract analysis and legal workflows</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 group-hover:text-green-400 mt-0.5 flex-shrink-0 transition-colors duration-300" />
                      <div>
                        <p className="text-white font-medium">Full Control</p>
                        <p className="text-gray-300 text-sm">You own and control all your data and processes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Traditional AI Card */}
            <div className="relative group">
              <ShineBorder
                className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                borderWidth={1}
                shineColor={["rgba(255, 255, 255, 0.1)", "rgba(239, 68, 68, 0.4)"]}
                duration={20}
              />
              <Card className="relative h-full p-8 bg-transparent border-white/10 hover:border-red-400/50 transition-all duration-300 shadow-lg shadow-white/5 hover:bg-red-900/20 hover:shadow-red-500/10 group-hover:scale-[1.02] min-h-[420px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-white/5 group-hover:border-red-400/40 group-hover:bg-red-500/20">
                      <CloudOff className="h-8 w-8 text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-2xl font-bold text-white">Traditional AI</h4>
                      <p className="text-gray-400 group-hover:text-red-400 text-sm font-medium transition-colors duration-300">Cloud-Based Solutions</p>
                    </div>
                  </div>

                  <div className="space-y-4 flex-grow">
                    <div className="flex items-start space-x-3">
                      <div className="h-5 w-5 rounded-full border-2 border-gray-400 group-hover:border-red-400 mt-0.5 flex-shrink-0 transition-colors duration-300"></div>
                      <div>
                        <p className="text-white font-medium">Data Privacy Risks</p>
                        <p className="text-gray-300 text-sm">Documents uploaded to external servers</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="h-5 w-5 rounded-full border-2 border-gray-400 group-hover:border-red-400 mt-0.5 flex-shrink-0 transition-colors duration-300"></div>
                      <div>
                        <p className="text-white font-medium">Ongoing Costs</p>
                        <p className="text-gray-300 text-sm">Monthly subscriptions and API fees</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="h-5 w-5 rounded-full border-2 border-gray-400 group-hover:border-red-400 mt-0.5 flex-shrink-0 transition-colors duration-300"></div>
                      <div>
                        <p className="text-white font-medium">Generic AI</p>
                        <p className="text-gray-300 text-sm">General-purpose models not optimized for legal work</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="h-5 w-5 rounded-full border-2 border-gray-400 group-hover:border-red-400 mt-0.5 flex-shrink-0 transition-colors duration-300"></div>
                      <div>
                        <p className="text-white font-medium">Limited Control</p>
                        <p className="text-gray-300 text-sm">Dependent on third-party providers and their policies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 text-lg">
              <strong>No compromises.</strong> Imagine professional legal AI without sacrificing privacy or control.
            </p>
          </div>
        </motion.div>

        {/* GURU Commercial Video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative">
            <ShineBorder
              className="absolute inset-0 rounded-2xl opacity-70"
              borderWidth={1}
              shineColor={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.5)"]}
              duration={25}
            />
            <Card className="relative p-8 bg-transparent border-white/10 backdrop-blur-sm">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  See GURU in Action
                </h3>
                <p className="text-gray-400 text-base">
                  Watch how GURU transforms legal document analysis while keeping everything local and private.
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                <video
                  ref={videoRef}
                  className="w-full h-[250px] sm:h-[400px] cursor-pointer object-cover object-[55%_center]"
                  poster="/guru-video-thumbnail.jpg"
                  onClick={handleVideoClick}
                >
                  <source src="/GURU_Commercial_Script_Generation.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Card>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
