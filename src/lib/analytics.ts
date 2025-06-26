/**
 * Analytics Client
 * A lightweight, privacy-first analytics implementation
 */

// Generate a random visitor ID if one doesn't exist
const getVisitorId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let visitorId = localStorage.getItem('aether_visitor_id');
  if (!visitorId) {
    visitorId = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15);
    localStorage.setItem('aether_visitor_id', visitorId);
  }
  return visitorId;
};

// Track page view
export const trackPageView = async (): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  try {
    const visitorId = getVisitorId();
    const pathname = window.location.pathname;
    const referrer = document.referrer || 'direct';
    
    await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: pathname,
        visitorId,
        referrer
      })
    });
  } catch (error) {
    // Silent fail - analytics should never break the site
    console.error('Analytics error:', error);
  }
};

// Track click events
export const trackEvent = async (
  eventType: string,
  elementId: string,
  elementName?: string
): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  try {
    const visitorId = getVisitorId();
    const pathname = window.location.pathname;
    
    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        elementId,
        elementName,
        page: pathname,
        visitorId
      })
    });
  } catch (error) {
    // Silent fail - analytics should never break the site
    console.error('Analytics error:', error);
  }
};

// Helper component to track clicks on elements
export const useTrackClick = () => {
  return (
    eventType = 'click',
    elementId: string, 
    elementName?: string
  ) => {
    return () => trackEvent(eventType, elementId, elementName);
  };
};

// Add click tracking to important elements
export const setupEventTracking = (): void => {
  if (typeof window === 'undefined') return;
  
  // Track clicks on data-track elements
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const trackElement = target.closest('[data-track]');
    
    if (trackElement) {
      const elementId = trackElement.getAttribute('data-track') || 'unknown';
      const elementName = trackElement.getAttribute('data-track-name') || undefined;
      trackEvent('click', elementId, elementName);
    }
  });
};

// Analytics provider component
export const initAnalytics = (): void => {
  if (typeof window === 'undefined') return;
  
  // Track initial page view
  trackPageView();
  
  // Set up event tracking
  setupEventTracking();
  
  // Track page views on route changes for SPA
  const handleRouteChange = () => {
    trackPageView();
  };
  
  // Listen for Next.js route changes
  if ('next' in window) {
    const router = (window as any).next.router;
    if (router && router.events) {
      router.events.on('routeChangeComplete', handleRouteChange);
    }
  }
}; 