/**
 * Event monitoring utility to help debug event handlers and button clicks
 */

type EventType = 'button' | 'form' | 'link' | 'custom';

type MonitoredEvent = {
  id: string;
  type: EventType;
  element: string;
  timestamp: number;
  details?: Record<string, any>;
  success: boolean;
};

// Store recent events in memory for debugging
const recentEvents: MonitoredEvent[] = [];
const MAX_EVENTS = 50;

/**
 * Track an event occurrence and store it for debugging
 */
export const trackEvent = (
  type: EventType,
  element: string,
  success: boolean = true,
  details?: Record<string, any>
): void => {
  const event: MonitoredEvent = {
    id: generateEventId(),
    type,
    element,
    timestamp: Date.now(),
    details,
    success
  };
  
  // Add to the beginning for most recent first
  recentEvents.unshift(event);
  
  // Keep the array size limited
  if (recentEvents.length > MAX_EVENTS) {
    recentEvents.pop();
  }
  
  // Log the event to console for monitoring
  console.log(`Event Tracked: ${type} - ${element}`, event);
};

/**
 * Get all recently tracked events
 */
export const getRecentEvents = (): MonitoredEvent[] => {
  return [...recentEvents];
};

/**
 * Clear the event history
 */
export const clearEventHistory = (): void => {
  recentEvents.length = 0;
};

/**
 * Generate a simple ID for the event
 */
const generateEventId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Create a wrapped click handler that includes monitoring
 */
export const monitoredClickHandler = (
  element: string,
  handler: (...args: any[]) => any
) => {
  return (...args: any[]) => {
    try {
      trackEvent('button', element);
      return handler(...args);
    } catch (error) {
      console.error(`Error in monitored click handler for ${element}:`, error);
      trackEvent('button', element, false, { error: String(error) });
      throw error;
    }
  };
};
