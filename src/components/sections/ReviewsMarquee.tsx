"use client";

import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

interface Review {
  name: string;
  username: string;
  body: string;
  img: string;
}

const reviews: Review[] = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  // You can extend this array with more real reviews when available.
];

export default function ReviewsMarquee({ className }: { className?: string }) {
  return (
    <div className={cn("py-12", className)}>
      <Marquee pauseOnHover className="w-full">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-lg px-6 py-4 min-w-[260px]"
          >
            <Image
              src={review.img}
              alt={review.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col text-xs">
              <span className="font-semibold text-white">{review.name}</span>
              <span className="text-gray-400">{review.username}</span>
              <p className="text-gray-300 mt-1 line-clamp-3">{review.body}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
} 