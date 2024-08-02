"use client";
import { useState, useEffect } from "react";

export default function TopTracks() {
  const [tracks, setTracks] = useState({
    data: {
      items: [],
    },
  });

  useEffect(() => {
    fetch("/api/top/tracks", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTracks(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-3">
      {tracks.data.items &&
        tracks.data.items.map((item, index) => {
          //@ts-ignore
          const album = item.album;
          const cover = album.images[0];
          return (
            <div key={index}>
              <img src={cover.url} height="300px" width="300px" />
            </div>
          );
        })}
    </div>
  );
}
