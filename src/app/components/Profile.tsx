import { auth } from "../auth";

export async function ProfilePicture() {
  const session = await auth();
  if (!session?.user || !session.user.image) return null;
  
  return (
    <div>
      <img src={session.user.image} alt="User profile picture" />
    </div>
  );
}
