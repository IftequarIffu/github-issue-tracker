import { signIn } from "next-auth/react";

const SignInButton = () => {
  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/' }); // Redirect to home page after sign out
  };

  return (
    <button onClick={handleSignIn}>
      Sign In
    </button>
  );
};

export default SignInButton;