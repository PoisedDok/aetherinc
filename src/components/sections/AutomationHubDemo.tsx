"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-14 items-center justify-center rounded-full border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

export default function AutomationHubDemo({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const driveRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);
  const notionRef = useRef<HTMLDivElement>(null);
  const slackRef = useRef<HTMLDivElement>(null);
  const zapierRef = useRef<HTMLDivElement>(null);

  return (
    <section className={cn("py-24 bg-black", className)}>
      <div
        ref={containerRef}
        className="relative mx-auto flex h-[450px] w-full max-w-5xl items-center justify-center overflow-hidden px-6"
      >
        <div className="flex w-full flex-row items-stretch justify-between gap-10">
          {/* Left: User */}
          <div className="flex flex-col justify-center">
            <Circle ref={userRef}>
              <Icons.user />
            </Circle>
          </div>

          {/* Center: Aether Hub */}
          <div className="flex flex-col justify-center">
            <Circle ref={hubRef} className="size-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none">
              <span className="text-center leading-tight text-sm">
                <span className="text-white font-extrabold">A</span><span className="text-white/80 font-semibold">ether</span>
                <br />
                <span className="text-white font-extrabold">I</span><span className="text-white/80 font-semibold">nc</span>
              </span>
            </Circle>
          </div>

          {/* Right: Integrations */}
          <div className="flex flex-col justify-center gap-4">
            <Circle ref={driveRef}>
              <Icons.googleDrive />
            </Circle>
            <Circle ref={docsRef}>
              <Icons.googleDocs />
            </Circle>
            <Circle ref={notionRef}>
              <Icons.notion />
            </Circle>
            <Circle ref={slackRef}>
              <Icons.slack />
            </Circle>
            <Circle ref={zapierRef}>
              <Icons.zapier />
            </Circle>
          </div>
        </div>

        {/* Beams from hub to outputs */}
        {[
          driveRef,
          docsRef,
          notionRef,
          slackRef,
          zapierRef,
        ].map((outRef, idx) => {
          // custom curvature values to create a clean fan-out (top arcs up, bottom arcs down)
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
              pathColor="#d1d5db"
              pathOpacity={1}
              gradientStartColor="#d1d5db"
              gradientStopColor="#a855f7"
              pathWidth={2}
            />
          );
        })}
        {/* Bi-directional beams between user and AetherInc */}
        {/* Top arc (user → hub) */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={userRef}
          toRef={hubRef}
          curvature={25}
          pathColor="#d1d5db"
          pathOpacity={1}
          gradientStartColor="#d1d5db"
          gradientStopColor="#d1d5db"
          pathWidth={2}
        />
        {/* Bottom arc (hub → user) */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={hubRef}
          toRef={userRef}
          curvature={-25}
          reverse
          pathColor="#d1d5db"
          pathOpacity={1}
          gradientStartColor="#d1d5db"
          gradientStopColor="#d1d5db"
          pathWidth={2}
        />
      </div>
    </section>
  );
}

const Icons: Record<string, () => React.ReactElement> = {
  user: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  googleDrive: () => (
    // minimal Drive triangle representation
    <svg width="40" height="40" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
    </svg>
  ),
  googleDocs: () => (
    <svg width="38" height="50" viewBox="0 0 47 65" xmlns="http://www.w3.org/2000/svg">
      <rect width="47" height="65" rx="4" fill="#4285F4" />
      <rect y="50" width="35" height="3" fill="#F1F1F1" />
      <rect y="44" width="35" height="3" fill="#F1F1F1" />
      <rect y="38" width="35" height="3" fill="#F1F1F1" />
      <rect y="32" width="35" height="3" fill="#F1F1F1" />
    </svg>
  ),
  notion: () => (
    <svg width="38" height="38" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="8" fill="#fff" />
      <path d="M6 4.3l55.3-4.1c6.8-.6 8.5-.2 12.8 2.9l17.7 12.4c2.9 2.1 3.9 2.7 3.9 5v68.2c0 4.3-1.6 6.8-7 7.2L24.5 100c-4.1.2-6-.4-8.2-3.1L3.3 79.9c-2.3-3.1-3.3-5.4-3.3-8.2V11.1C0 7.6 1.6 4.7 6 4.3z" fill="#000"/>
    </svg>
  ),
  zapier: () => (
    <svg width="40" height="12" viewBox="0 0 244 66" xmlns="http://www.w3.org/2000/svg"><path d="M39.0441 45.2253H0V54.789H39.0441V45.2253Z" fill="#FF4F00" /></svg>
  ),
  slack: () => (
    <Image src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/slack.svg" alt="slack" width={42} height={42} />
  ),
  openai: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
}; 