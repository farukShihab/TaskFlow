"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/design/forms/Button";

export default function SocialLogin() {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      Continue with Google
    </Button>
  );
}