"use client";

import { useAuth } from "@/hooks/auth-context";

export function UserProfile() {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>{user?.id}</p>
      <p>{user?.email}</p>
      <p>{user?.password}</p>
    </div>
  );
}