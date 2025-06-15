"use client";

import React, {
  forwardRef,
  useRef,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamically import react-calendar on client to reduce bundle size
const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

function cn(...inputs: (string | undefined | null | boolean)[]): string {
    return inputs.filter(Boolean).join(' ');
}

/* ------------------------------------------------------
    PLACEHOLDER COMPONENTS
    ------------------------------------------------------ */

// Marquee placeholder
export function Marquee({
  children,
  className,
  pauseOnHover,
}: PropsWithChildren<{
  className?: string;
  pauseOnHover?: boolean;
}>) {
  return (
    <div
      className={cn(
        "whitespace-nowrap overflow-hidden animate-[marquee_20s_linear_infinite]",
        pauseOnHover && "hover:pause", // just a conceptual example
        className
      )}
    >
      {children}
    </div>
  );
}

// Minimal BentoGrid placeholder
export function BentoGrid({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 group",
        className
      )}
    >
      {children}
    </div>
  );
}

// Minimal BentoCard placeholder
export function BentoCard({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon,
  name,
  description,
  href,
  cta,
  background,
  className,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: React.ComponentType<any>;
  name?: string;
  description?: string;
  href?: string;
  cta?: string;
  className?: string;
  background?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl border p-6 overflow-hidden",
        "hover:shadow-md transition-shadow duration-300",
        "bg-transparent backdrop-blur-sm border-gray-200/20 dark:border-gray-800/20",
        "group hover:cursor-pointer min-h-[200px]",
        className
      )}
    >
      {/* Background (animated or static) */}
      {background && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-75">
          {background}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start gap-2">
        {Icon && (
          <Icon className="w-8 h-8 text-cyan-500 dark:text-cyan-400 mb-2" />
        )}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>

        {href && (
          <a
            href={href}
            className="mt-4 inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-full transition"
          >
            {cta || "Learn more"}
          </a>
        )}
      </div>
    </div>
  );
}

// Minimal AnimatedBeam placeholder
export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature,
  endYOffset,
  reverse,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  fromRef: React.RefObject<HTMLDivElement>;
  toRef: React.RefObject<HTMLDivElement>;
  curvature?: number;
  endYOffset?: number;
  reverse?: boolean;
}) {
  // Placeholder logic only
  return <svg className="absolute inset-0 pointer-events-none" />;
}

// Minimal AnimatedListDemo placeholder
export function AnimatedListDemo({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-gray-200 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center p-4",
        className
      )}
    >
      <p className="text-gray-700 dark:text-gray-300">AnimatedListDemo</p>
    </div>
  );
}

// Minimal AnimatedBeamMultipleOutputDemo placeholder
export default function AnimatedBeamMultipleOutputDemo({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center p-4",
        className
      )}
    >
      <p className="text-gray-700 dark:text-gray-300">
        AnimatedBeamMultipleOutputDemo
      </p>
    </div>
  );
}

/* ------------------------------------------------------
   REAL FEATURES + BENTO DEMO
   ------------------------------------------------------ */

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        value={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top scale-75 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-90"
      />
    ),
  },
];

// The BentoDemo that displays all features
export function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

/* ------------------------------------------------------
   ANIMATED BEAM DEMO
   ------------------------------------------------------ */
export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const div1Ref = useRef<HTMLDivElement>(null!);
  const div2Ref = useRef<HTMLDivElement>(null!);
  const div3Ref = useRef<HTMLDivElement>(null!);
  const div4Ref = useRef<HTMLDivElement>(null!);
  const div5Ref = useRef<HTMLDivElement>(null!);
  const div6Ref = useRef<HTMLDivElement>(null!);
  const div7Ref = useRef<HTMLDivElement>(null!);

  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <Icons.googleDrive />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.googleDocs />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <Icons.notion />
          </Circle>
          <Circle ref={div4Ref} className="size-16">
            <Icons.openai />
          </Circle>
          <Circle ref={div6Ref}>
            <Icons.zapier />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <Icons.whatsapp />
          </Circle>
          <Circle ref={div7Ref}>
            <Icons.messenger />
          </Circle>
        </div>
      </div>

      {/* Animated beams connecting circles */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}

// Utility circle component used by AnimatedBeamDemo
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

// Icon set for the AnimatedBeamDemo
const Icons = {
  notion: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ... omitted for brevity (the same Notion icon from your snippet) */}
      <path
        d="M6.017 4.313l55.333 -4.087c..."
        fill="#ffffff"
      />
      <path
        d="M61.35 0.227l..."
        fill="#000000"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
  openai: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ... omitted for brevity (OpenAI icon path) */}
      <path d="M22.2819 9.8211a5.9847..." />
    </svg>
  ),
  googleDrive: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 87.3 78"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ... omitted for brevity */}
      <path d="m6.6 66.85 3.85 6.65..." fill="#0066da" />
      {/* ... etc */}
    </svg>
  ),
  googleDocs: () => (
    <svg
      width="47px"
      height="65px"
      viewBox="0 0 47 65"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ... omitted for brevity */}
      <path d="M29.375,0 L4.40625,0 C..." fill="#4285F4" />
    </svg>
  ),
  zapier: () => (
    <svg
      width="105"
      height="28"
      viewBox="0 0 244 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ... omitted for brevity */}
      <path d="M57.1877 45.2253L57.1534..." fill="#201515" />
    </svg>
  ),
  whatsapp: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 175.216 175.552"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ... omitted for brevity */}
      <path
        d="m54.532 138.45 2.235 1.324c..."
        fill="#b3b3b3"
        filter="url(#a)"
      />
    </svg>
  ),
  messenger: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ... omitted for brevity */}
      <path
        fill="url(#8O3wK6b5ASW2Wn6hRCB5xa_YFbzdUk7Q3F8_gr1)"
        d="M44,23.5C44,34.27,35.05..."
      />
    </svg>
  ),
};

/* ------------------------------------------------------
   TYPING ANIMATION DEMO
   ------------------------------------------------------ */

export function TypingAnimationDemo() {
  return <TypingAnimation>Typing Animation</TypingAnimation>;
}

// Minimal placeholder for the <TypingAnimation> component
export function TypingAnimation({ children }: { children?: React.ReactNode }) {
  return (
    <span className="animate-pulse text-lg text-cyan-400 font-semibold">
      {children}
    </span>
  );
}

/* ------------------------------------------------------
   INTERACTIVE GRID PATTERN DEMO
   ------------------------------------------------------ */

// Minimal placeholder for InteractiveGridPattern
export function InteractiveGridPattern({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-gradient-to-r from-gray-600 to-gray-800", className)} />
  );
}

export function InteractiveGridPatternDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <p className="z-10 text-white">Interactive Grid Pattern Demo</p>
    </div>
  );
}
