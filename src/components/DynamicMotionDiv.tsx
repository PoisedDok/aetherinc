import dynamic from 'next/dynamic';

// Dynamically load framer-motion's motion.div on client side
const DynamicMotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

export default DynamicMotionDiv; 