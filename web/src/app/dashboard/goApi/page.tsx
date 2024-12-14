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

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-semibold">Go API</h1>
      <div className="mt-3">
        <h1>endpoint: {endPoint}</h1>
        <h1>payload: {JSON.stringify(payload)}</h1>
      </div>
      <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md" onClick={getUser}>
        Get user
      </button>
      {user && (
        <div className="mt-4">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}