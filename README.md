
## 🍳 What's in da Fridge?

**What's in da Fridge?** is a playful Farcaster Mini App designed to turn your leftover ingredients into quick, fun recipe suggestions. It features a cartoon-style fridge that you can interact with: open the fridge door, view your ingredients, and get cooking ideas based on what you have.

The app offers a demo mode for users who haven't connected their wallet yet, and unlocks persistent personal fridges when a wallet is connected. Ingredients are categorized and displayed inside a beautifully animated fridge UI, with sounds and micro-interactions that make the experience feel alive.

It's perfect for:
- Degens who love to cook (or at least pretend to).
- Users looking for a fun, onchain-native way to manage ingredients.
- Anyone exploring how creative Farcaster Frames can be.

### 🔮 Upcoming Features

- **OpenAI-powered recipe generation**: Instead of only predefined recipes, the app will use OpenAI to suggest new meals based on whatever weird (or normal) combination of ingredients you add. AI chef incoming. 👨‍🍳
  
- **Redis-based notification system**: With Redis and webhook integration, connected users will receive onchain-native notifications when new recipes, features, or personalized content becomes available. This enables a smarter, more interactive experience.

- **Ingredient memory per wallet**: Users will soon be able to permanently store and retrieve their fridge contents via wallet-based storage (e.g., via Frames, or custom backend).

- **Social recipe sharing**: Share your fridge or your best recipe combo directly on Farcaster. Let others cook your degenerate creations.

Built using:
- [MiniKit](https://docs.base.org/builderkits/minikit/overview) for seamless Farcaster integration
- [OnchainKit](https://docs.base.org/builderkits/onchainkit/getting-started) for metadata and account association
- [Base](https://base.org) for onchain logic
- [Vercel](https://vercel.com) for blazing fast deployment

🌈 This is just the beginning — more degen kitchen experiments coming soon!

# MiniKit Template

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-onchain --mini`](), configured with:

- [MiniKit](https://docs.base.org/builderkits/minikit/overview)
- [OnchainKit](https://www.base.org/builders/onchainkit)
- [Tailwind CSS](https://tailwindcss.com)
- [Next.js](https://nextjs.org/docs)

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. Verify environment variables, these will be set up by the `npx create-onchain --mini` command:

You can regenerate the FARCASTER Account Association environment variables by running `npx create-onchain --manifest` in your project directory.

The environment variables enable the following features:

- Frame metadata - Sets up the Frame Embed that will be shown when you cast your frame
- Account association - Allows users to add your frame to their account, enables notifications
- Redis API keys - Enable Webhooks and background notifications for your application by storing users notification details

```bash
# Shared/OnchainKit variables
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=
NEXT_PUBLIC_URL=
NEXT_PUBLIC_ICON_URL=
NEXT_PUBLIC_ONCHAINKIT_API_KEY=

# Frame metadata
FARCASTER_HEADER=
FARCASTER_PAYLOAD=
FARCASTER_SIGNATURE=
NEXT_PUBLIC_APP_ICON=
NEXT_PUBLIC_APP_SUBTITLE=
NEXT_PUBLIC_APP_DESCRIPTION=
NEXT_PUBLIC_APP_SPLASH_IMAGE=
NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR=
NEXT_PUBLIC_APP_PRIMARY_CATEGORY=
NEXT_PUBLIC_APP_HERO_IMAGE=
NEXT_PUBLIC_APP_TAGLINE=
NEXT_PUBLIC_APP_OG_TITLE=
NEXT_PUBLIC_APP_OG_DESCRIPTION=
NEXT_PUBLIC_APP_OG_IMAGE=

# Redis config
REDIS_URL=
REDIS_TOKEN=
```

3. Start the development server:
```bash
npm run dev
```

## Template Features

### Frame Configuration
- `.well-known/farcaster.json` endpoint configured for Frame metadata and account association
- Frame metadata automatically added to page headers in `layout.tsx`

### Background Notifications
- Redis-backed notification system using Upstash
- Ready-to-use notification endpoints in `api/notify` and `api/webhook`
- Notification client utilities in `lib/notification-client.ts`

### Theming
- Custom theme defined in `theme.css` with OnchainKit variables
- Pixel font integration with Pixelify Sans
- Dark/light mode support through OnchainKit

### MiniKit Provider
The app is wrapped with `MiniKitProvider` in `providers.tsx`, configured with:
- OnchainKit integration
- Access to Frames context
- Sets up Wagmi Connectors
- Sets up Frame SDK listeners
- Applies Safe Area Insets

## Customization

To get started building your own frame, follow these steps:

1. Remove the DemoComponents:
   - Delete `components/DemoComponents.tsx`
   - Remove demo-related imports from `page.tsx`

2. Start building your Frame:
   - Modify `page.tsx` to create your Frame UI
   - Update theme variables in `theme.css`
   - Adjust MiniKit configuration in `providers.tsx`

3. Add your frame to your account:
   - Cast your frame to see it in action
   - Share your frame with others to start building your community

## Learn More

- [MiniKit Documentation](https://docs.base.org/builderkits/minikit/overview)
- [OnchainKit Documentation](https://docs.base.org/builderkits/onchainkit/getting-started)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
