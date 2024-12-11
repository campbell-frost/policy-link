"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const auth = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = async (path: string) => {
    setIsLoading(true);
    router.push(path);
    setIsLoading(false);
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="mb-3">Welcome to PolicyLinkSAAS</h1>
      <div className="flex gap-x-2">
        {auth.user ? (
          <Button
            onClick={() => handleNavigation("/dashboard")}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Dashboard"}
          </Button>
        ) : (
          <Button
            onClick={() => handleNavigation("/sign-in")}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
        )}
      </div>
    </div>
  );
}
