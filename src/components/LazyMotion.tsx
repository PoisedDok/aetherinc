// Create a client-only dynamic wrapper around framer-motion's motion
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Use a more specific type for the dynamic import
const LazyMotion = dynamic(
  () => import('framer-motion').then((mod) => mod.motion),
  { ssr: false }
) as ComponentType<any>;

export default LazyMotion; 