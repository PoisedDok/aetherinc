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

// Get base API URL
const getApiBaseUrl = (): string => {
  if (typeof window === 'undefined') return '';
  
  // Use the environment variable if available, otherwise use relative URL
  return process.env.NEXT_PUBLIC_API_URL || '';
};

// Track page view
export const trackPageView = async (): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  try {
    const visitorId = getVisitorId();
    const pathname = window.location.pathname;
    const referrer = document.referrer || 'direct';
    const baseUrl = getApiBaseUrl();
    
    console.debug('[Analytics] Tracking page view:', pathname);
    
    const response = await fetch(`${baseUrl}/api/analytics/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: pathname,
        visitorId,
        referrer
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[Analytics] Error tracking page view:', response.status, errorData);
    }
  } catch (error) {
    // Silent fail - analytics should never break the site
    console.error('[Analytics] Error tracking page view:', error);
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
    const baseUrl = getApiBaseUrl();
    
    console.debug('[Analytics] Tracking event:', eventType, elementId);
    
    const response = await fetch(`${baseUrl}/api/analytics/event`, {
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
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[Analytics] Error tracking event:', response.status, errorData);
    }
  } catch (error) {
    // Silent fail - analytics should never break the site
    console.error('[Analytics] Error tracking event:', error);
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

  // Respect global disable flag
  if (process.env.NEXT_PUBLIC_ANALYTICS_DISABLED === 'true') {
    console.info('[Analytics] Analytics are disabled by configuration');
    return;
  }

  // Require cookie consent
  const consent = localStorage.getItem('aether_cookie_consent');
  if (consent !== 'accepted') {
    console.info('[Analytics] Waiting for cookie consent…');
    return;
  }

  console.info('[Analytics] Initializing analytics');

  trackPageView();
  setupEventTracking();

  const handleRouteChange = () => trackPageView();

  if ('next' in window) {
    const router = (window as any).next.router;
    if (router?.events) {
      router.events.on('routeChangeComplete', handleRouteChange);
    }
  }
}; 