"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { AiFillGoogleCircle } from "react-icons/ai";

export const GoogleButton: React.FC = () => {
  function login() {
    signIn("google");
  }
  return (
    <Button
      variant="outline"
      className="w-full h-12 relative font-bold"
      onClick={login}
    >
      <AiFillGoogleCircle size={40} className="absolute left-10" />
      Google login
    </Button>
  );
};
