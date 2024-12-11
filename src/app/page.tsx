"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/auth";
import Link from "next/link";

export default function HomePage() {
  const auth = useUser();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="mb-3">Welcome to PolicyLinkSAAS</h1>
      <div className="flex gap-x-2">
        {auth.user
          ? (
            <Button>
              <Link href={"/dashboard"}>
                Dashboard
              </Link>
            </Button>
          ) : (
            <Button>
              <Link href={"/sign-in"}>
                Sign In
              </Link>
            </Button>
          )
        }
      </div>
    </div>
  );
}
