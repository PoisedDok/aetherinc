"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Mail, Calculator, Users, Database, MessageSquare, FileText, Bot, Zap, Video } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";
import React from "react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { FaUser, FaEnvelope, FaCalculator, FaVideo, FaMicrosoft } from "react-icons/fa";
import { SiGoogledrive, SiGoogledocs, SiNotion, SiSlack, SiZapier, SiGithub, SiTrello } from "react-icons/si";

// Enhanced Circle component with hover tooltip
const Circle = React.forwardRef<
  HTMLDivElement,
  { 
    className?: string; 
    children?: React.ReactNode;
    tooltip?: string;
    role?: string;
  }
>(({ className, children, tooltip, role }, ref) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative">
      <div
        ref={ref}
        className={cn(
          "z-30 flex size-20 items-center justify-center rounded-full border-2 border-white/50 bg-white p-4 shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer relative",
          className,
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {tooltip && showTooltip && (
        <div className="fixed z-[9999] top-auto bottom-auto left-1/2 transform -translate-x-1/2 -translate-y-[calc(100%+20px)]" style={{ pointerEvents: 'none' }}>
          <div className="bg-gray-900/95 text-white text-sm px-4 py-3 rounded-lg shadow-xl border border-gray-700 max-w-[300px] overflow-visible whitespace-normal">
            <div className="font-medium text-blue-300">{role}</div>
            <div className="text-white text-xs mt-1">{tooltip}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-gray-900/95"></div>
          </div>
        </div>
      )}
    </div>
  );
});
Circle.displayName = "Circle";

// Enhanced Icons with better representations
const Icons = {
  user: () => <FaUser className="h-8 w-8 text-gray-900" />,
  email: () => <FaEnvelope className="h-8 w-8 text-gray-700" />,
  calculator: () => <FaCalculator className="h-8 w-8 text-gray-700" />,
  meeting: () => <FaVideo className="h-8 w-8 text-gray-700" />,
  googleDrive: () => <SiGoogledrive className="h-8 w-8 text-blue-600" />,
  googleDocs: () => <SiGoogledocs className="h-8 w-8 text-blue-500" />,
  notion: () => <SiNotion className="h-8 w-8 text-gray-700" />,
  slack: () => <SiSlack className="h-8 w-8 text-purple-600" />,
  zapier: () => <SiZapier className="h-8 w-8 text-orange-500" />,
  trello: () => <SiTrello className="h-8 w-8 text-sky-500" />,
  github: () => <SiGithub className="h-8 w-8 text-gray-700" />,
  microsoft: () => <FaMicrosoft className="h-8 w-8 text-blue-500" />,
  teams: () => (
    <svg viewBox="0 0 2228.8 2073.3" className="h-8 w-8">
      <path fill="#5059C9" d="M1554.4,777.1h575.2v1296.2h-575.2V777.1z"/>
      <path fill="#7B83EB" d="M1024.2,777.1h575.2v1296.2h-575.2V777.1z"/>
      <path fill="#505AC4" d="M1024.1,777.1v477.8l287.7,278.8l287.5-278.8V777.1H1024.1z"/>
      <path fill="#4855B4" d="M1024.1,1254.9v818.4h575.1v-818.4l-287.5,278.8L1024.1,1254.9z"/>
      <path fill="#7B83EB" d="M99.3,777.4h479.5v479.5H99.3V777.4z"/>
      <path fill="#7B83EB" d="M99.3,1256.9h479.5v479.5H99.3V1256.9z"/>
      <path fill="#505AC4" d="M578.8,777.4h479.5v479.5H578.8V777.4z"/>
      <path fill="#505AC4" d="M578.8,1256.9h479.5v479.5H578.8V1256.9z"/>
    </svg>
  ),
  onedrive: () => (
    <svg viewBox="0 0 24 24" className="h-8 w-8">
      <path fill="#0364B8" d="M10.4 12.1c.8-2.3 3.3-3.7 5.7-3.1l.8-1.2c1.1-1.6 2.7-2.5 4.5-2.5h.1v-.1c0-2.8-2.2-5-5-5-1.3 0-2.5.5-3.5 1.3l-5.7 4.9-4.2 5.8c.5-2.2 2.7-3.8 5-3.8.8 0 1.6.2 2.3.5V9zm7.3 1.9l-4-2c-1-.5-2.2-.5-3.2 0L5.1 15l2.5 3.5 10.1-4.5z"/>
      <path fill="#0078D4" d="M17.7 14l-10.1 4.5h11.6c2.8 0 5-2.2 5-5 0-2.6-2-4.8-4.5-5l-2 5.5z"/>
      <path fill="#1490DF" d="M6.7 14l1-1-2.5-1c-2.8 0-5 2.2-5 5 0 2.8 2.2 5 5 5h5l-4.7-6.5 1.2-1.5z"/>
      <path fill="#28A8EA" d="M7.7 13L5.2 15l2.5 3.5h11.6L10.4 14l-2.7-1z"/>
    </svg>
  ),
  powerpoint: () => (
    <svg viewBox="0 0 24 24" className="h-8 w-8">
      <path fill="#EB6C4D" d="M24 4.5c0-1.4-1.1-2.5-2.5-2.5h-19C1.1 2 0 3.1 0 4.5v15C0 20.9 1.1 22 2.5 22h19c1.4 0 2.5-1.1 2.5-2.5v-15z"/>
      <path fill="#FFFFFF" d="M8.3 4.5c2.7 0 4.9 0 5.1 0 2.2.1 4 .4 5.1 1.2.8.5 1.4 1.5 1.4 2.4 0 .9-.5 1.9-1.4 2.4-.9.6-2.1 1-3.3 1.2.2.1.5.2.6.4.3.2.5.6.8 1 0 0 1.8 3 2.7 4.5.1.1.1.2.2.4h-3.7c-.1-.1-.1-.2-.2-.3-.9-1.5-1.9-3.3-2.8-4.9-.1-.1-.1-.2-.2-.2-.1-.1-.3-.1-.5-.1h-.8v5.5H8.3V4.5zm3 6.9c.7 0 1.4 0 2 0s1-.4 1-.9c.1-.6-.3-1.1-.9-1.2h-2.2v2.1h.1z"/>
    </svg>
  ),
  excel: () => (
    <svg viewBox="0 0 24 24" className="h-8 w-8">
      <path fill="#21A366" d="M24 4.5c0-1.4-1.1-2.5-2.5-2.5h-19C1.1 2 0 3.1 0 4.5v15C0 20.9 1.1 22 2.5 22h19c1.4 0 2.5-1.1 2.5-2.5v-15z"/>
      <path fill="#FFFFFF" d="M15.1 9.5L12.5 14l-2.6-4.5H7l4 6.5-4 6.5h2.9l2.6-4.5 2.6 4.5h2.9l-4-6.5 4-6.5z"/>
    </svg>
  ),
  database: () => <Database className="h-8 w-8 text-gray-700" />,
  bot: () => <Bot className="h-8 w-8 text-gray-700" />,
  aether: () => (
    <Image src="/Aether.jpeg" alt="Aether Logo" width={84} height={84} className="object-contain rounded-full" />
  ),
};

type WorkflowItem = {
  id: string;
  name: string;
  description: string;
  Visual: () => JSX.Element;
};

const workflows: readonly WorkflowItem[] = [
  {
    id: "email-automation",
    name: "AI Email Agent",
    description: "Deploy an AI agent that handles customer emails, support tickets, and internal communications 24/7. Automatically categorizes, responds, and escalates based on your business rules.",
    Visual: () => {
      const containerRef = useRef<HTMLDivElement>(null);
      const userRef = useRef<HTMLDivElement>(null);
      const hubRef = useRef<HTMLDivElement>(null);
      const outlookRef = useRef<HTMLDivElement>(null);
      const teamsRef = useRef<HTMLDivElement>(null);
      const onedriveRef = useRef<HTMLDivElement>(null);
      const docsRef = useRef<HTMLDivElement>(null);
      const driveRef = useRef<HTMLDivElement>(null);

      const outputs = [outlookRef, teamsRef, onedriveRef, docsRef, driveRef] as const;

      return (
        <div
          ref={containerRef}
          className="relative mx-auto flex h-[630px] w-full max-w-5xl items-center justify-center overflow-hidden"
        >
          {/* Animated beams - rendered first (lower z-index) */}
          <div className="absolute inset-0 z-10">
            {/* Beams from hub to outputs */}
            {outputs.map((outRef, idx) => {
              const curvatureValues = [80, 40, 0, -40, -80] as const;
              const curvature = curvatureValues[idx];
              return (
                <AnimatedBeam
                  key={idx}
                  containerRef={containerRef}
                  fromRef={hubRef}
                  toRef={outRef}
                  curvature={curvature}
                  delay={idx * 0.15}
                  pathColor="#3b82f6"
                  pathOpacity={0.8}
                  gradientStartColor="#3b82f6"
                  gradientStopColor="#8b5cf6"
                  pathWidth={3}
                />
              );
            })}
            
            {/* Bi-directional beams between user and AI Agent */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={userRef}
              toRef={hubRef}
              curvature={25}
              pathColor="#10b981"
              pathOpacity={0.8}
              gradientStartColor="#10b981"
              gradientStopColor="#3b82f6"
              pathWidth={3}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={hubRef}
              toRef={userRef}
              curvature={-25}
              reverse
              pathColor="#f59e0b"
              pathOpacity={0.8}
              gradientStartColor="#f59e0b"
              gradientStopColor="#10b981"
              pathWidth={3}
            />
          </div>

          {/* Circles - rendered on top (higher z-index) */}
          <div className="relative z-30 flex w-full flex-row items-stretch justify-between gap-14">
            {/* Left: User */}
            <div className="flex flex-col justify-center">
              <Circle 
                ref={userRef}
                tooltip="Business users who send and receive emails requiring responses"
                role="Business User"
              >
                <Icons.user />
              </Circle>
            </div>

            {/* Center: AI Email Agent */}
            <div className="flex flex-col justify-center">
              <Circle 
                ref={hubRef} 
                className="size-28 p-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none overflow-hidden z-30"
                tooltip="Processes, categorizes, and responds to emails automatically using AI"
                role="AI Email Agent"
              >
                <Icons.aether />
              </Circle>
            </div>

            {/* Right: Integrations */}
            <div className="flex flex-col justify-center gap-4">
              <Circle 
                ref={outlookRef}
                tooltip="Manages email responses, scheduling, and organization"
                role="Microsoft Outlook"
              >
                <svg viewBox="0 0 32 32" className="h-8 w-8">
                  <path fill="#0078d4" d="M19.484 7.937v6.326l2.086 1.294a.47.47 0 0 0 .192.07h.022l8.656-.033V9.845A1.9 1.9 0 0 0 28.558 8h-7.192a1.882 1.882 0 0 0-1.882 1.882v.055Z"/>
                  <path fill="#0078d4" d="M19.484 17.3 22 19.454l8.328 5.752a1.856 1.856 0 0 1-1.77 1.323h-7.192a1.882 1.882 0 0 1-1.882-1.882V17.3ZM30.418 16.1l-8.421.032V24l8.421-5.898Z"/>
                  <path fill="#0078d4" d="m1.6 8.4 12.014 7.9 12.019-7.9L13.614 24 1.6 8.4Z"/>
                </svg>
              </Circle>
              <Circle 
                ref={teamsRef}
                tooltip="Communication hub for messages and team collaboration"
                role="Microsoft Teams"
              >
                <Icons.teams />
              </Circle>
              <Circle 
                ref={onedriveRef}
                tooltip="Secure cloud storage for email attachments and files"
                role="Microsoft OneDrive"
              >
                <Icons.onedrive />
              </Circle>
              <Circle 
                ref={docsRef}
                tooltip="Collaborative document editing for team responses"
                role="Google Docs"
              >
                <Icons.googleDocs />
              </Circle>
              <Circle 
                ref={driveRef}
                tooltip="File storage and sharing platform for larger attachments"
                role="Google Drive"
              >
                <Icons.googleDrive />
              </Circle>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "financial-intelligence",
    name: "Smart Financial Hub",
    description: "Connect to your company databases, ERP systems, and financial tools to get real-time cost estimates, invoice processing, and financial insights through a single AI-powered admin interface.",
    Visual: () => {
      const containerRef = useRef<HTMLDivElement>(null);
      const userRef = useRef<HTMLDivElement>(null);
      const hubRef = useRef<HTMLDivElement>(null);
      const databaseRef = useRef<HTMLDivElement>(null);
      const excelRef = useRef<HTMLDivElement>(null);
      const powerPointRef = useRef<HTMLDivElement>(null);
      const teamsRef = useRef<HTMLDivElement>(null);
      const driveRef = useRef<HTMLDivElement>(null);

      const outputs = [databaseRef, excelRef, powerPointRef, teamsRef, driveRef] as const;

      return (
        <div ref={containerRef} className="relative mx-auto flex h-[630px] w-full max-w-5xl items-center justify-center overflow-hidden">
          {/* Animated beams - rendered first (lower z-index) */}
          <div className="absolute inset-0 z-10">
            {outputs.map((outRef, idx) => (
              <AnimatedBeam 
                key={idx} 
                containerRef={containerRef} 
                fromRef={hubRef} 
                toRef={outRef} 
                curvature={80 - idx*30} 
                delay={idx*0.15} 
                pathColor="#10b981" 
                pathOpacity={0.8} 
                gradientStartColor="#10b981" 
                gradientStopColor="#06b6d4" 
                pathWidth={3} 
              />
            ))}
            <AnimatedBeam 
              containerRef={containerRef} 
              fromRef={userRef} 
              toRef={hubRef} 
              curvature={25} 
              pathColor="#f59e0b" 
              pathOpacity={0.8} 
              gradientStartColor="#f59e0b" 
              gradientStopColor="#10b981" 
              pathWidth={3} 
            />
            <AnimatedBeam 
              containerRef={containerRef} 
              fromRef={hubRef} 
              toRef={userRef} 
              curvature={-25} 
              reverse 
              pathColor="#8b5cf6" 
              pathOpacity={0.8} 
              gradientStartColor="#8b5cf6" 
              gradientStopColor="#f59e0b" 
              pathWidth={3} 
            />
          </div>

          {/* Circles - rendered on top (higher z-index) */}
          <div className="relative z-30 flex w-full flex-row items-stretch justify-between gap-14">
            <div className="flex flex-col justify-center">
              <Circle 
                ref={userRef}
                tooltip="Financial team members who need real-time financial insights and cost estimates"
                role="Finance Team"
              >
                <Icons.user />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle 
                ref={hubRef} 
                className="size-28 p-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 border-none overflow-hidden z-30"
                tooltip="AI-powered financial analysis system that connects to various data sources and generates insights"
                role="Smart Financial Hub"
              >
                <Icons.aether />
              </Circle>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Circle 
                ref={databaseRef}
                tooltip="Enterprise database system storing critical financial and operational data"
                role="Enterprise Database"
              >
                <Icons.database />
              </Circle>
              <Circle 
                ref={excelRef}
                tooltip="Advanced spreadsheet analysis and financial modeling"
                role="Microsoft Excel"
              >
                <Icons.excel />
              </Circle>
              <Circle 
                ref={powerPointRef}
                tooltip="Automated financial report presentations and dashboards"
                role="Microsoft PowerPoint"
              >
                <Icons.powerpoint />
              </Circle>
              <Circle 
                ref={teamsRef}
                tooltip="Team collaboration for financial reviews and discussions"
                role="Microsoft Teams"
              >
                <Icons.teams />
              </Circle>
              <Circle 
                ref={driveRef}
                tooltip="Secure cloud storage for financial documents and reports"
                role="Google Drive"
              >
                <Icons.googleDrive />
              </Circle>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "meeting-intelligence",
    name: "Meeting Intelligence",
    description: "Transform every meeting into actionable insights. Our AI attends meetings, generates summaries, extracts action items, and automatically updates project management tools.",
    Visual: () => {
      const containerRef = useRef<HTMLDivElement>(null);
      const userRef = useRef<HTMLDivElement>(null);
      const hubRef = useRef<HTMLDivElement>(null);
      const teamsRef = useRef<HTMLDivElement>(null);
      const docsRef = useRef<HTMLDivElement>(null);
      const outlookRef = useRef<HTMLDivElement>(null);
      const onedriveRef = useRef<HTMLDivElement>(null);
      const excelRef = useRef<HTMLDivElement>(null);

      const outputs = [teamsRef, docsRef, outlookRef, onedriveRef, excelRef] as const;

      return (
        <div ref={containerRef} className="relative mx-auto flex h-[630px] w-full max-w-5xl items-center justify-center overflow-hidden">
          {/* Animated beams - rendered first (lower z-index) */}
          <div className="absolute inset-0 z-10">
            {outputs.map((outRef, idx) => (
              <AnimatedBeam 
                key={idx} 
                containerRef={containerRef} 
                fromRef={hubRef} 
                toRef={outRef} 
                curvature={80 - idx*30} 
                delay={idx*0.15} 
                pathColor="#8b5cf6" 
                pathOpacity={0.8} 
                gradientStartColor="#8b5cf6" 
                gradientStopColor="#ec4899" 
                pathWidth={3} 
              />
            ))}
            <AnimatedBeam 
              containerRef={containerRef} 
              fromRef={userRef} 
              toRef={hubRef} 
              curvature={25} 
              pathColor="#06b6d4" 
              pathOpacity={0.8} 
              gradientStartColor="#06b6d4" 
              gradientStopColor="#8b5cf6" 
              pathWidth={3} 
            />
            <AnimatedBeam 
              containerRef={containerRef} 
              fromRef={hubRef} 
              toRef={userRef} 
              curvature={-25} 
              reverse 
              pathColor="#f59e0b" 
              pathOpacity={0.8} 
              gradientStartColor="#f59e0b" 
              gradientStopColor="#06b6d4" 
              pathWidth={3} 
            />
          </div>

          {/* Circles - rendered on top (higher z-index) */}
          <div className="relative z-30 flex w-full flex-row items-stretch justify-between gap-14">
            <div className="flex flex-col justify-center">
              <Circle 
                ref={userRef}
                tooltip="Team members participating in meetings and needing efficient follow-ups"
                role="Meeting Participants"
              >
                <Icons.user />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle 
                ref={hubRef} 
                className="size-28 p-0 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 border-none overflow-hidden z-30"
                tooltip="AI system that analyzes meeting content, extracts action items, and generates summaries automatically"
                role="Meeting Intelligence"
              >
                <Icons.aether />
              </Circle>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Circle 
                ref={teamsRef}
                tooltip="Virtual meeting platform with recording and transcription capabilities"
                role="Microsoft Teams"
              >
                <Icons.teams />
              </Circle>
              <Circle 
                ref={docsRef}
                tooltip="Collaborative document editor for meeting notes and action items"
                role="Google Docs"
              >
                <Icons.googleDocs />
              </Circle>
              <Circle 
                ref={outlookRef}
                tooltip="Calendar integration and automated meeting follow-ups"
                role="Microsoft Outlook"
              >
                <svg viewBox="0 0 32 32" className="h-8 w-8">
                  <path fill="#0078d4" d="M19.484 7.937v6.326l2.086 1.294a.47.47 0 0 0 .192.07h.022l8.656-.033V9.845A1.9 1.9 0 0 0 28.558 8h-7.192a1.882 1.882 0 0 0-1.882 1.882v.055Z"/>
                  <path fill="#0078d4" d="M19.484 17.3 22 19.454l8.328 5.752a1.856 1.856 0 0 1-1.77 1.323h-7.192a1.882 1.882 0 0 1-1.882-1.882V17.3ZM30.418 16.1l-8.421.032V24l8.421-5.898Z"/>
                  <path fill="#0078d4" d="m1.6 8.4 12.014 7.9 12.019-7.9L13.614 24 1.6 8.4Z"/>
                </svg>
              </Circle>
              <Circle 
                ref={onedriveRef}
                tooltip="Cloud storage for meeting recordings and shared files"
                role="Microsoft OneDrive"
              >
                <Icons.onedrive />
              </Circle>
              <Circle 
                ref={excelRef}
                tooltip="Tracking action items, deliverables, and project timelines"
                role="Microsoft Excel"
              >
                <Icons.excel />
              </Circle>
            </div>
          </div>
        </div>
      );
    },
  },
] as const;

export default function WorkflowsCarousel({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const total = workflows.length;
  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const currentWorkflow = workflows[index];

  return (
    <div className={cn("space-y-10", className)}>
      {/* Workflow Indicator */}
      <div className="flex justify-center gap-2 mb-6">
        {workflows.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              idx === index 
                ? "bg-blue-500 scale-125" 
                : "bg-white/20 hover:bg-white/40"
            )}
            aria-label={`Go to workflow ${idx + 1}`}
          />
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-sm font-medium text-blue-300">
              Quick Win #{index + 1}
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white">
            <TextAnimate>
              {currentWorkflow.name}
            </TextAnimate>
          </h3>
          <p className="text-xl text-gray-300 max-w-2xl">
            {currentWorkflow.description}
          </p>
          <div className="text-sm text-gray-400 mt-2">
            💡 Hover over the workflow nodes to see detailed descriptions
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="rounded-full bg-white/5 p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110"
            aria-label="Previous workflow"
          >
            <ArrowLeft className="h-6 w-6 text-white/80" />
          </button>
          <button
            onClick={next}
            className="rounded-full bg-white/5 p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110"
            aria-label="Next workflow"
          >
            <ArrowRight className="h-6 w-6 text-white/80" />
          </button>
        </div>
      </div>

      {/* Carousel Content */}
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-8">
        <currentWorkflow.Visual />
      </div>
      
      {/* Workflow Benefits */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-2xl font-bold text-green-400">
            {index === 0 ? "15-20h" : index === 1 ? "75%" : "5-8h"}
          </div>
          <div className="text-sm text-gray-300">
            {index === 0 ? "Saved per week" : index === 1 ? "Faster processing" : "Reclaimed weekly"}
          </div>
        </div>
        <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-2xl font-bold text-blue-400">
            {index === 0 ? "2-3 days" : index === 1 ? "1-2 weeks" : "Same day"}
          </div>
          <div className="text-sm text-gray-300">Time to deploy</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-2xl font-bold text-purple-400">24/7</div>
          <div className="text-sm text-gray-300">Automated operation</div>
        </div>
      </div>
    </div>
  );
} 