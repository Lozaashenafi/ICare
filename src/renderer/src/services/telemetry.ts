import posthog from 'posthog-js'

export const initTelemetry = (userId: string, userName: string) => {
  // Use the VITE_ prefix here
  const apiKey = import.meta.env.VITE_POSTHOG_KEY;

  if (!apiKey) {
    console.error("Telemetry error: API Key missing from .env");
    return;
  }

  posthog.init(apiKey, {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'always', 
    autocapture: false,
  })

  posthog.identify(userId, {
    name: userName,
    app_version: '1.0.4'
  })
}