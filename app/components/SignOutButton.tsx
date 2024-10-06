import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' }); // Redirect to home page after sign out
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;