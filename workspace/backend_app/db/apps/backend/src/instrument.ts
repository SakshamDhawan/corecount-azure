import * as Sentry from "@sentry/node";

// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: "https://3e8cac67ad79a7e8e44840330ce2e496@o4504927283249152.ingest.us.sentry.io/4507802693861376",

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
