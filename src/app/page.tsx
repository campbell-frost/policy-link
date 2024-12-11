"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import Link from "next/link";

export default function HomePage() {
  const auth = useAuth();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="mb-3">Welcome to PolicyLinkSAAS</h1>
      <div className="flex gap-x-2">
        {auth.user
          ? (
            <Link href={"/dashboard"}>
              <Button>
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href={"/sign-in"}>
              <Button>
                Sign In
              </Button>
            </Link>
          )
        }
      </div>
    </div>
  );
}
