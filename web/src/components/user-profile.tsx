"use client";

import { useAuth } from "@/hooks/auth-context";
import { useEffect } from "react";

export function UserProfile() {
  const { user } = useAuth();
  
  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <div>
      <h1>User Profile</h1>
      <p>{user?.id}</p>
      <p>{user?.email}</p>
      <p>{user?.password}</p>
    </div>
  );
}