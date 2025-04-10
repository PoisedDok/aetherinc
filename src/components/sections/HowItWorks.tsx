"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { RetroGrid } from '@/components/magicui/retro-grid';

// HowItWorks section props type
interface HowItWorksProps {
  innerRef: React.RefObject<HTMLElement | null>;
}

export default function HowItWorks({ innerRef }: HowItWorksProps) {
  // Video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [cellSize, setCellSize] = useState(60);
  
  // Refs for scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check if mobile - client-side only
  useEffect(() => {
    const handleResize = () => {
      setCellSize(window.innerWidth < 768 ? 40 : 60);
    };
    
    // Set initial size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Toggle video playback
  const togglePlayback = () => {
    if (!videoRef.current) return;
    
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsVideoPlaying(!isVideoPlaying);
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  // Update progress bar
  const updateProgress = () => {
    if (!videoRef.current) return;
    
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
  };
  
  // Format time (seconds -> MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  // Handle video ended event
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleEnded = () => {
        setIsVideoPlaying(false);
        videoElement.currentTime = 0;
      };
      
      videoElement.addEventListener('ended', handleEnded);
      
      return () => {
        videoElement.removeEventListener('ended', handleEnded);
      };
    }
  }, []);
  
  return (
    <section 
      ref={innerRef}
      className="relative min-h-screen py-16 md:py-24 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <RetroGrid 
          className="h-full w-full"
          cellSize={cellSize}
          opacity={0.4}
          angle={0}
          lightLineColor="rgba(255, 255, 255, 0.08)"
          darkLineColor="rgba(255, 255, 255, 0.04)"
        />
      </div>
      
      <div ref={containerRef} className="container mx-auto relative z-10 section-spacing">
        <motion.div
          style={{ opacity, y }}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="heading-2 font-bold mb-6 text-center text-white"
          >
            How GURU Works
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="body-text text-gray-300 text-center max-w-3xl mx-auto mb-12"
          >
            GURU transforms how you interact with AI by processing everything locally on-device, ensuring complete privacy and instant responses.
          </motion.p>
          
          {/* Video Player Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 rounded-xl overflow-hidden border border-white/10 shadow-glow-subtle bg-black/50 backdrop-blur-sm"
          >
            <div className="relative">
              {/* Video */}
              <video 
                ref={videoRef}
                onTimeUpdate={updateProgress}
                onClick={togglePlayback}
                muted={isMuted}
                className="w-full aspect-video object-cover cursor-pointer"
                poster="/path-to-poster-image.jpg"
                preload="metadata"
                playsInline
              >
                <source src="/20250303_1045_Futuristic GURU Computer_remix_01jndsr1f4fartej0dewgqv4kv.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play/Pause overlay */}
              {!isVideoPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                  onClick={togglePlayback}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/20 transition-colors cursor-pointer">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                </div>
              )}
              
              {/* Video Controls */}
              <div className="p-4 bg-black/70 backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  {/* Progress bar */}
                  <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-white"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                {/* Control buttons */}
                <div className="flex items-center justify-between">
                  {/* Play/Pause button */}
                  <button 
                    onClick={togglePlayback}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors touch-target"
                    aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                  >
                    {isVideoPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" />}
                  </button>
                  
                  {/* Timer */}
                  <div className="text-sm text-white/80">
                    {videoRef.current ? formatTime(videoRef.current.currentTime) : '0:00'} / 
                    {videoRef.current && videoRef.current.duration ? formatTime(videoRef.current.duration) : '0:00'}
                  </div>
                  
                  {/* Mute button */}
                  <button 
                    onClick={toggleMute}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors touch-target"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "1. Zero Cloud Dependency",
                description: "All computations happen directly on your GURU device, ensuring your data never leaves your possession."
              },
              {
                title: "2. Neural Processing Unit",
                description: "Our custom 67 TOPS NPU efficiently handles complex AI tasks with minimal power consumption."
              },
              {
                title: "3. Personalized Learning",
                description: "GURU adapts to your preferences and usage patterns, becoming more helpful over time."
              },
              {
                title: "4. Seamless Integration",
                description: "Works with your existing devices and services through secure, privacy-preserving connections."
              },
              {
                title: "5. Continuous Updates",
                description: "Regular model updates are downloaded and verified locally, improving capabilities while maintaining privacy."
              },
              {
                title: "6. Complete Transparency",
                description: "Full control over what data is used and stored, with the option to delete anything at any time."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 