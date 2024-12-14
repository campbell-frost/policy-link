"use client"
import { useState } from "react";

type User = {
  ID: string;
  Name: string;
  Email: string;
} | null;

const endPoint = "http://localhost:1738/getUser";
const payload = 1;
export default function Page() {
  const [user, setUser] = useState<User>(null);
  const [users, setUsers] = useState<User[]>([]);

  const getUser = async () => {
    try {
      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
      );
      const data: User = await response.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  }

  const listUsers = async () => {
    try {
      const response = await fetch("http://localhost:1739/listUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify("John Doe"),
      }
      );
      const data: User[] = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-semibold">Go API</h1>
      <div className="mt-3">
        <h1>endpoint: {endPoint}</h1>
        <h1>payload: {JSON.stringify(payload)}</h1>
      </div>
      <div className="flex gap-x-2 mt-4">
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={getUser}>
          Get user
        </button>
        <button className=" px-4 py-2 text-white bg-blue-500 rounded-md" onClick={listUsers}>
          List users
        </button>
      </div>
      <div className="grid grid-cols-2">
        <div>

          {user && (
            <div className="mt-4">
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          )}
        </div>
        <div>
          {users.map((user) => (
            <div key={user?.ID} className="mt-4">
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}