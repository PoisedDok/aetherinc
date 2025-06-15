"use client";

import React, { useEffect, useRef } from 'react';

interface JarvisBackgroundProps {
  className?: string;
}

export default function JarvisBackground({ className = "" }: JarvisBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    growing: boolean;
  }>>([]);
  
  // Track mouse position for interactive effects
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize particles
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      const particles = [];
      const particleCount = Math.floor(window.innerWidth / 10); // Adjust for density
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          growing: Math.random() > 0.5
        });
      }
      
      particlesRef.current = particles;
    };
    
    // Mouse event handlers for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { 
        x: e.clientX, 
        y: e.clientY,
        active: true
      };
      
      // Set timeout to mark mouse as inactive after delay
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouseRef.current.active = false;
      }, 5000);
    };
    
    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    let mouseTimeout: ReturnType<typeof setTimeout>;

    // Draw grid
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.5;
      
      // Horizontal lines
      const gridSpacing = 30;
      for (let y = 0; y < window.innerHeight; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(window.innerWidth, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < window.innerWidth; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, window.innerHeight);
        ctx.stroke();
      }

      // Add a few brighter accent lines
      const accentInterval = gridSpacing * 5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let y = 0; y < window.innerHeight; y += accentInterval) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(window.innerWidth, y);
        ctx.stroke();
      }
      
      for (let x = 0; x < window.innerWidth; x += accentInterval) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, window.innerHeight);
        ctx.stroke();
      }
    };

    // Draw particles
    const drawParticles = () => {
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.5})`;
        ctx.fill();
      });
    };

    // Draw HUD-like elements to mimic Jarvis
    const drawHudElements = () => {
      // Draw corner brackets
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      const cornerSize = 30;
      
      // Top-left corner
      ctx.beginPath();
      ctx.moveTo(10, 10 + cornerSize);
      ctx.lineTo(10, 10);
      ctx.lineTo(10 + cornerSize, 10);
      ctx.stroke();
      
      // Top-right corner
      ctx.beginPath();
      ctx.moveTo(window.innerWidth - 10 - cornerSize, 10);
      ctx.lineTo(window.innerWidth - 10, 10);
      ctx.lineTo(window.innerWidth - 10, 10 + cornerSize);
      ctx.stroke();
      
      // Bottom-left corner
      ctx.beginPath();
      ctx.moveTo(10, window.innerHeight - 10 - cornerSize);
      ctx.lineTo(10, window.innerHeight - 10);
      ctx.lineTo(10 + cornerSize, window.innerHeight - 10);
      ctx.stroke();
      
      // Bottom-right corner
      ctx.beginPath();
      ctx.moveTo(window.innerWidth - 10 - cornerSize, window.innerHeight - 10);
      ctx.lineTo(window.innerWidth - 10, window.innerHeight - 10);
      ctx.lineTo(window.innerWidth - 10, window.innerHeight - 10 - cornerSize);
      ctx.stroke();
      
      // Get current time for animations
      const now = Date.now();
      
      // Add pulsing glow (reduced opacity)
      const pulse = Math.sin(now * 0.002) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.02 * pulse})`;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Draw futuristic circular interface in bottom right
      const circleX = window.innerWidth - 100;
      const circleY = window.innerHeight - 100;
      const radiusOuter = 40;
      const radiusInner = 30;
      
      // Outer circle
      ctx.beginPath();
      ctx.arc(circleX, circleY, radiusOuter, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + pulse * 0.1})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Inner circle with rotation
      ctx.beginPath();
      ctx.arc(circleX, circleY, radiusInner, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + pulse * 0.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Rotating line
      const rotation = now * 0.001;
      const endX = circleX + Math.cos(rotation) * radiusOuter;
      const endY = circleY + Math.sin(rotation) * radiusOuter;
      
      ctx.beginPath();
      ctx.moveTo(circleX, circleY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Simulated data points
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const dotX = circleX + Math.cos(angle) * radiusOuter;
        const dotY = circleY + Math.sin(angle) * radiusOuter;
        
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`;
        ctx.fill();
      }
      
      // Draw connection lines when mouse is active
      if (mouseRef.current.active) {
        const { x, y } = mouseRef.current;
        
        // Mouse tracking circle
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Outer tracking circle with pulsing
        ctx.beginPath();
        ctx.arc(x, y, 20 + pulse * 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Connection line to circular interface
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(circleX, circleY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Display coordinates
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillText(`X: ${Math.floor(x)}`, x + 25, y);
        ctx.fillText(`Y: ${Math.floor(y)}`, x + 25, y + 20);
      }
    };

    // Update particles
    const updateParticles = () => {
      particlesRef.current = particlesRef.current.map(particle => {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.y > window.innerHeight) particle.y = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        
        // Pulse size
        if (particle.growing) {
          particle.size += 0.02;
          if (particle.size > 2.5) particle.growing = false;
        } else {
          particle.size -= 0.02;
          if (particle.size < 0.5) particle.growing = true;
        }
        
        return particle;
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Create solid deep-black background for better text contrast
      const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      gradient.addColorStop(0, '#000000'); // pure black at top
      gradient.addColorStop(1, '#050505'); // near-black at bottom (subtle depth)
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      drawGrid();
      drawHudElements();
      updateParticles();
      drawParticles();
      
      animationFrame = requestAnimationFrame(animate);
    };

    // Start animation
    let animationFrame = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimeout);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 z-10 ${className}`}
      style={{ 
        pointerEvents: 'none', // Allow clicking through
      }}
    />
  );
}