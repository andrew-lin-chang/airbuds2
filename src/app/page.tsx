"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Dashboard from "./dashboard/page";

export default function Home() {
  const [token, setToken] = useState();

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl my-4">Airbuds 2!</h1>
      <p>In development...</p>
      { !token ? (
        <div className="bg-green-600 rounded-full p-4 my-8">
          <a className="font-extrabold" href="/auth/login">
            Connect to Spotify
          </a>
        </div>
      ) : (
        <Dashboard />
      )}
    </main>
  );
}
