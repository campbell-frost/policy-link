"use client";

import { useAuth } from "@/hooks/auth-context";

export default function Page() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Email</h1>
      <p>{user?.email}</p>
    </div>
  );
}