This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:
```bash
# inside project root folder
npm i
# do the same for server folder
cd server
npm i
```

Next, create an [Spotify developer account](https://developer.spotify.com/) if you haven't already!

Follow the [Spotify Web API Getting Started Steps](https://developer.spotify.com/documentation/web-api) and grab your `Client ID` and `Client Secret` from your app settings.

Then, create a `.env` file in your project root directory and add your secrets:

```
SPOTIFY_CLIENT_ID=<your-spotify-client-id>
SPOTIFY_CLIENT_SECRET=<your-spotify-client-secret>
REDIRECT_URI=http://localhost:3000/auth/callback
```
Also, make sure your Spotify app settings matches `REDIRECT_URI`.

MAKE SURE TO ADD `.env` TO YOUR `.gitignore`!! Wouldn't want those API keys to be public now, would we?

Now, start the backend server first:
```bash
cd server
npm run dev
```

Finally, run the development server (from your project root):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. YAY!

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
