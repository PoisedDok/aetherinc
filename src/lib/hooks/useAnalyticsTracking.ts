"use client";

import { useEffect, useCallback } from 'react';
import { trackEvent, trackPageView } from '@/lib/analytics';

type TrackEventOptions = {
  eventType?: string;
  elementName?: string;
};

export function useAnalyticsTracking() {
  // Track page view on component mount
  useEffect(() => {
    trackPageView();
  }, []);
  
  // Helper function to track events
  const trackElementEvent = useCallback((
    elementId: string,
    options: TrackEventOptions = {}
  ) => {
    const { eventType = 'click', elementName } = options;
    return () => trackEvent(eventType, elementId, elementName);
  }, []);
  
  // Create a data attribute object for components that need tracking
  const trackingProps = useCallback((
    elementId: string,
    elementName?: string
  ) => {
    return {
      'data-track': elementId,
      'data-track-name': elementName
    };
  }, []);
  
  return {
    trackEvent: trackElementEvent,
    trackPageView,
    trackingProps
  };
} 