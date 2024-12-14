"use client"
import { User } from "@/lib/types";
import { useApiService } from "@/lib/apiService";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [user, fetchUser] = useApiService<User>();
  const [users, fetchUsers] = useApiService<User[]>();
  const [uuid, setUuid] = useState<string>("");


  const getUser = () => fetchUser<string>({ endpoint: "getUser", body: uuid });
  const getUsers = () => fetchUsers({ endpoint: "listUsers" });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Go API Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-md p-6 w-96">
          <h2 className="text-xl font-semibold ">Search For User</h2>
          <h5>fc58c373-64b7-489d-a6c4-41b9195a0cb3</h5>
          <div className="flex my-3">
            <Input type="text" onChange={(e) => setUuid(e.target.value)}></Input>
            <Button
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              onClick={getUser}>Search</Button>
          </div>
          {user.error && <p className="text-red-500 p-3 bg-muted rounded-lg">{user.errorMessage}</p>}
          {user.pending && <p className="text-gray-500">Loading...</p>}
          {user.data && (
            <div className="space-y-2">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{user.data.name}</p>
                <p className="text-gray-600">{user.data.email}</p>
              </div>
            </div>
          )}
        </div>
        <div className="bg-card rounded-xl shadow-md p-6 w-96">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Users List</h2>
            <button
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              onClick={getUsers}
            >
              Get Users
            </button>
          </div>
          {users.error && <p className="text-red-500 p-3 bg-muted rounded-lg">{users.errorMessage}</p>}
          {users.pending && <p className="text-gray-500">Loading...</p>}
          {users.data && (
            <div className="space-y-3">
              {users.data.map((user, i) => (
                <div key={i} className="p-3 bg-muted rounded-lg">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}