// Create a client-only dynamic wrapper around framer-motion's motion
import dynamic from 'next/dynamic';

const LazyMotion = dynamic(
  () =>
    import('framer-motion').then((mod) => ({
      default: mod.motion,
    })),
  { ssr: false }
);

export default LazyMotion; 