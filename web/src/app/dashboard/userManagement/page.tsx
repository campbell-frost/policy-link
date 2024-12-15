"use client"
import { useEffect, useState } from "react";
import { useApiService } from "@/lib/apiService";
import { User } from "@/lib/types";

export default function Page() {
  const [users, fetchUsers] = useApiService<User[]>();

  useEffect(() => {
    (async () => {
      await fetchUsers({ endpoint: "listUsers" });
    })();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.pending && <p>Loading...</p>}
      {users.error && <p>Error: {users.errorMessage}</p>}
      {users.data && (
        <ul>
          {users.data.map((user) => (
            <li key={user?.id}>
              {user?.name} {user?.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}