"use client";

import { BentoCard, BentoGrid, BentoGridItem } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { TweetCard } from "@/components/magicui/tweet-card";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import {
  Bell,
  Calendar,
  FileText,
  Globe,
  Search,
  Lock,
  MessageCircle,
  Settings,
  Share2,
  Star,
  User,
} from "lucide-react";

const files = [
  {
    name: "Bitcoin",
    body: "Bitcoin is a decentralized digital currency, without a central bank or single administrator.",
  },
  {
    name: "Ethereum",
    body: "Ethereum is a decentralized, open-source blockchain with smart contract functionality.",
  },
  {
    name: "Aether",
    body: "Aether is a decentralized, open-source blockchain with smart contract functionality.",
  },
  {
    name: "Solana",
    body: "Solana is a high-performance blockchain supporting builders around the world.",
  },
  {
    name: "Cardano",
    body: "Cardano is a proof-of-stake blockchain platform: the first to be founded on peer-reviewed research.",
  },
];

const features = [
  {
    Icon: FileText,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Search,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: Globe,
    name: "Multilingual",
    description: "Support for 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-2 lg:row-end-4 lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: Share2,
    name: "Collaboration",
    description: "Collaborate with your team in real-time.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-4",
  },
  {
    Icon: Lock,
    name: "Security",
    description: "Your files are safe with our end-to-end encryption.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-2 lg:row-end-4 lg:col-start-3 lg:col-end-4",
  },
];

const tweets = [
  {
    author: "Jack",
    username: "jack",
    avatar: "https://cdn.dribbble.com/users/1237379/avatars/normal/a6a57e3445837c15d481d6f1f452140e.jpg?1681146399",
    body: "This is the best service I have ever used. I am very satisfied with the results.",
    timestamp: "2h",
    url: "https://twitter.com/jack/status/1234567890",
  },
  {
    author: "John Doe",
    username: "johndoe",
    avatar: "https://cdn.dribbble.com/users/1237379/avatars/normal/a6a57e3445837c15d481d6f1f452140e.jpg?1681146399",
    body: "I am very happy with the service. I will definitely use it again.",
    timestamp: "1d",
    url: "https://twitter.com/johndoe/status/1234567890",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <div className="z-10 flex flex-col items-center text-center">
          <TypingAnimation
            className="text-4xl font-bold text-black dark:text-white"
            phrases={["AetherInc Services"]}
          />
          <p className="mt-4 text-lg text-muted-foreground">
            We offer a wide range of services to help you with your business.
          </p>
          <div className="mt-6 flex gap-4">
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Get Started
              </span>
            </ShimmerButton>
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Contact Us
              </span>
            </ShimmerButton>
          </div>
        </div>
        <RetroGrid />
      </div>

      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Trusted by the best
        </h2>
        <Marquee pauseOnHover className="[--duration:20s]">
          {files.map((f, idx) => (
            <BentoGridItem
              key={idx}
              title={f.name}
              description={f.body}
              className="w-64 mx-4"
            />
          ))}
        </Marquee>
      </div>

      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
          <BentoGrid className="lg:grid-rows-3">
            {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            What our customers say
          </h2>
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border bg-background py-20 md:shadow-xl">
            <Marquee pauseOnHover className="[--duration:20s]">
              {tweets.map((tweet, idx) => (
                <TweetCard key={idx} tweet={tweet} />
              ))}
            </Marquee>
          </div>
        </div>
      </section>
    </div>
  );
} 