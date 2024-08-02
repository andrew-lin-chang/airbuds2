"use client";
import { error } from "console";
import { useState, useEffect } from "react";

export default function TopTracks({ user }) {
  const [tracks, setTracks] = useState({
    items: [],
  });

  useEffect(() => {
    fetch("http://localhost:5000/toptracks", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setTracks(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-3">
      {tracks.items.map((item, index) => {
        const album = item.album;
        const cover = album.images[0]
        return (
          <div>
            <img
              key={index}
              src={cover.url}
              height="300px"
              width="300px"
            />
          </div>
        );
      })}
    </div>
  );
}
