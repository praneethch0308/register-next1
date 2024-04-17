import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.firstName}</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}