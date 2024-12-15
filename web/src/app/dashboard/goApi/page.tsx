"use client"
import { User } from "@/lib/types";
import { useApiService } from "@/lib/apiService";
import { use, useState } from "react";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [users, fetchUsers] = useApiService<User[]>();
  const [user, fetchUser] = useApiService<User>();
  const [uuid, setUuid] = useState<string>("");

  const getUsers = async () => await fetchUsers({ endpoint: "listUsers" });
  const searchForUser = async () => await fetchUser<string>({ endpoint: "getUser", body: uuid });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Go API Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-md p-6 w-96">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Get User</h2>
            <button
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              onClick={searchForUser}
            >
              Search
            </button>
          </div>
          <Input
            type="text"
            placeholder="Enter user ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={uuid}
            onChange={(e) => setUuid(e.target.value)}
          />
          {user.error && <p className="text-red-500 p-3 bg-muted rounded-lg">{user.errorMessage}</p>}
          {user.pending && <p className="text-gray-500">Loading...</p>}
          {user.data && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium">{user.data?.id}</p>
              <p className="text-gray-600">{user.data?.email}</p>
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
                  <p className="font-medium">{user?.id}</p>
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