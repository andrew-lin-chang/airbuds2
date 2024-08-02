import { signIn, signOut, auth } from "@/app/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("spotify");
      }}
    >
      <button
        className="rounded-lg bg-slate-700 bg-opacity-80 p-4 flex justify-between gap-4 hover:bg-green-500 hover:bg-opacity-50"
        type="submit"
      >
        <img
          className="w-8 h-8"
          src="https://authjs.dev/img/providers/spotify.svg"
        />
        <p className="font-bold text-lg">Sign in with Spotify</p>
      </button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        className="rounded-lg bg-slate-700 bg-opacity-80 p-4 hover:bg-green-500 hover:bg-opacity-50"
        type="submit"
      >
        <p className="font-bold text-lg">Sign Out</p>
      </button>
    </form>
  );
}

export async function AuthButton() {
  const session = await auth();
    if (!session?.user) return <SignIn />;
    return <SignOut />;
}
