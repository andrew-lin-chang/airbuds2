// taken from https://authjs.dev/guides/refresh-token-rotation

import NextAuth, { type User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import Spotify from "next-auth/providers/spotify";

// override default spotify authorization scope
const scopeParams = new URLSearchParams({
  scope: "user-read-private user-read-email user-top-read",
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
      clientId: process.env.AUTH_SPOTIFY_ID,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET,
      authorization: `https://accounts.spotify.com/authorize?${scopeParams}`,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // first login, save access_token, refresh_token, etc into JWT
      if (account) {
        const userProfile: User = {
          id: token.sub,
          name: profile?.name,
          email: profile?.email,
          image: token?.picture,
        };

        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          user: userProfile,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as AdapterUser;
        session.access_token = token.access_token as string;
      }
      return session;
    },
  },
});

// extend session to include access_token for spotify api calls
declare module "next-auth" {
  interface Session {
    access_token?: string;
    error?: "RefreshAccessTokenError";
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     access_token: string;
//     expires_at: number;
//     refresh_token: string;
//     error?: "RefreshAccessTokenError";
//   }
// }
