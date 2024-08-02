import { AuthButton } from "./components/AuthComponents";
import { ProfilePicture } from "./components/Profile";

export default function App() {
  
  return (
    <main className="container mx-auto">
      <div className="grid justify-items-center gap-4 my-8">
        <h1 className="text-5xl font-extrabold">Airbuds 2</h1>
        <ProfilePicture />
        <AuthButton />
      </div>
    </main>
  );
}