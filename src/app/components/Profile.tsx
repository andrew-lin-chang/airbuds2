import { auth } from "../auth";

export async function ProfilePicture() {
  const session = await auth();
  if (!session?.user || !session.user.image) return null;
  
  return (
    <div>
      <img className="rounded-full" src={session.user.image} alt="User profile picture" />
    </div>
  );
}
