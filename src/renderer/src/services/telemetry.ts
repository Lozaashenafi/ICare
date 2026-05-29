import posthog from 'posthog-js'

export const initTelemetry = (userId: string, userName: string) => {
  const key = import.meta.env.VITE_POSTHOG_KEY;

  if (!key) {
    console.warn("PostHog Key missing. Analytics disabled.");
    return;
  }

  posthog.init(key, {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'always', 
    autocapture: false, // We want to track manually for clean data
  });

  // Link the local ICare ID to PostHog
  posthog.identify(userId, {
    name: userName,
    app_version: '1.0.4'
  });
};

export const trackEvent = (name: string, properties?: Record<string, any>) => {
  posthog.capture(name, properties);
};