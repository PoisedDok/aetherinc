"use client";

import React from 'react';
import { Button } from './button';
import { ButtonHTMLAttributes } from 'react';
import { useAnalyticsTracking } from '@/lib/hooks/useAnalyticsTracking';

interface TrackedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  trackingId: string;
  trackingName?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const TrackedButton = React.forwardRef<HTMLButtonElement, TrackedButtonProps>(
  ({ trackingId, trackingName, onClick, ...props }, ref) => {
    const { trackEvent } = useAnalyticsTracking();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Track the click event
      trackEvent(trackingId, { elementName: trackingName })();
      
      // Call the original onClick handler if provided
      if (onClick) {
        onClick(e);
      }
    };
    
    return (
      <Button
        ref={ref}
        onClick={handleClick}
        data-track={trackingId}
        data-track-name={trackingName}
        {...props}
      />
    );
  }
);

TrackedButton.displayName = 'TrackedButton';

export { TrackedButton }; 