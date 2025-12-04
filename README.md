# Uber Clone (Expo + Clerk) 🚗

A mobile-first Uber-style experience built with Expo Router and React Native. The app includes onboarding, Clerk authentication, live location capture, Google Places search, driver markers on a map, and recent-ride cards with static map previews.

## Features
- Onboarding carousel and auth flows (email/password via Clerk, Google CTA placeholder)
- Expo Router navigation with tabbed home, rides, chat, and profile stacks
- Device location permissions and map with nearby driver markers
- Google Places autocomplete for destination search and Geoapify static map previews
- Ride list cards with driver details, timing, and payment status
- Neon serverless Postgres endpoint stub for persisting users

## Stack
- Expo 54, React Native 0.81, React 19, TypeScript, Expo Router
- Clerk Expo for authentication, Zustand for state, NativeWind/Tailwind styling
- react-native-maps, react-native-google-places-autocomplete, Geoapify static maps
- Neon serverless Postgres client for the `/app/(api)/user+api.ts` route

## Prerequisites
- Node.js 18+ and npm (project uses `npm` via `package-lock.json`)
- Xcode (for iOS simulator) and/or Android Studio (for emulator), or Expo Go on a device

## Environment
Create a `.env` in the project root with the required keys:

```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
EXPO_PUBLIC_GOOGLE_API_KEY=...
EXPO_PUBLIC_GEOAPIFY_API_KEY=...
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB
```

Notes:
- Google key must allow Maps SDK + Places API for maps and autocomplete.
- Geoapify key powers static previews in ride cards.
- `DATABASE_URL` is used by the Neon-backed route in `app/(api)/user+api.ts`.

## Local Development
1) Install dependencies
```bash
npm install
```

2) Start the dev server (choose device/emulator/Expo Go when prompted)
```bash
npx expo start
```

Additional scripts:
- `npm run android` / `npm run ios` to build and run native projects
- `npm run web` to run in the browser
- `npm run lint` for ESLint
- `npm run reset-project` to restore the starter template (destructive)

## Project Structure (high level)
- `app/` Expo Router routes (auth stack, tabs, modal, API route)
- `components/` Reusable UI (buttons, inputs, map, ride cards)
- `store/` Zustand stores for location and driver selection
- `lib/` Map helpers (region calculation, driver markers, ETA/price estimation)
- `constants/` Icons, images, and onboarding copy

## Notes
- Location services must be enabled in the simulator/device for the home map to center on the user.
- The Google sign-in CTA is scaffolded; wire it to a provider or Clerk OAuth before production use.
