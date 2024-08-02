import { SignIn, SignOut } from "./components/AuthComponents";
import { auth } from "./auth";
import { ProfilePicture } from "./components/Profile";
import TopTracks from "./components/TopTracks";

export default async function App() {
  const session = await auth();

  return (
    <main className="container mx-auto flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold my-8">Airbuds 2</h1>
      {session?.user ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <ProfilePicture />
          <SignOut />
          <TopTracks />
        </div>
      ) : (
        <SignIn />
      )}
    </main>
  );
}
