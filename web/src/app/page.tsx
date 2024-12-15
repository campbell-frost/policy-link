"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="mb-3">Welcome to PolicyLinkSAAS</h1>
      <div className="flex gap-x-2">
        <Link href="/dashboard">
          <Button>
            Go To dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
