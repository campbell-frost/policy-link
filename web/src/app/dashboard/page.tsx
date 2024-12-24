"use client";

import { useAuth } from "@/hooks/auth-context";

export default function Page() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">Welcome {user?.email}!</h1>
    </div>
  );
}