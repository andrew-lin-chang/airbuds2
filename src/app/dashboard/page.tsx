import { useState, useEffect } from "react";

export default function Dashboard() {
  const [user, setUser] = useState({
    display_name: "",
    email: "",
    images: [
      {
        url: "",
        height: 0,
        width: 0,
      },
    ],
  });

  useEffect(() => {
    fetch("http://localhost:5000/user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <div className="font-extrabold my-8 text-xl">Hello, {user.display_name}</div>
      <div className="flex justify-center">
        <img
          className="rounded-full"
          src={user.images[0].url}
          alt="profile picture"
          height={user.images[0].height}
          width={user.images[0].width}
        />
      </div>
    </div>
  );
}
