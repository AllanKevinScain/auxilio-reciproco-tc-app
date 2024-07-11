"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { AiFillGithub } from "react-icons/ai";

export const GithubButton: React.FC = () => {
  function login() {
    signIn("github");
  }
  return (
    <Button
      variant="outline"
      className="w-full h-12 relative font-bold"
      onClick={login}
    >
      <AiFillGithub size={40} className="absolute left-10" />
      Github login
    </Button>
  );
};
