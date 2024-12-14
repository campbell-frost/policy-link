"use client"
import { useState } from "react";

type User = {
  ID: string;
  Name: string;
  Email: string;
} | null;

enum Status {
  Success = "SUCCESS",
  Error = "ERROR",
  Loading = "LOADING",
};

type Response<T> = {
  status: Status.Success;
  result: T;
} | {
  status: Status.Error;
  message: string;
} | {
  status: Status.Loading;
};

type GetUserResponse = Response<User>;
type ListUserResponse = Response<User[]>;

const baseUrl = "http://localhost:1738/";
const uuid = crypto.randomUUID();

const payload: User = {
  ID: uuid,
  Name: "Campbell Frost",
  Email: "campbellsfrost@gmail.com"
};

export default function Page() {
  const [user, setUser] = useState<GetUserResponse>({ status: Status.Loading });
  const [users, setUsers] = useState<ListUserResponse>({ status: Status.Loading });

  const getUser = async () => {
    try {
      const response = await fetch(`${baseUrl}getUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify("41b7146a-0f45-422d-a9b6-91fadeb0b7ec"),
      }
      );
      const data: User = await response.json();
      setUser({ status: Status.Success, result: data });
    } catch (error: any) {
      setUser({ status: Status.Error, message: error });
    }
  };

  const listUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}listUsers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify("Campbell Frost"),
      }
      );
      const data: User[] = await response.json();
      setUsers({ status: Status.Success, result: data });
    } catch (error: any) {
      setUsers({ status: Status.Error, message: error });
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch(`${baseUrl}createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
      );
      const data = await response.json();
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center" suppressHydrationWarning>
      <h1 className="text-center text-4xl font-semibold mt-4">Go API</h1>
      <div>
        <div className="flex flex-col mt-3">
          <h1>baseUrl: {baseUrl}</h1>
          <h1>payload:</h1>
          <pre>{JSON.stringify(payload)}</pre>
        </div>
        <div className="flex gap-x-2 mt-4">
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={getUser}>
            Get user
          </button>
          <button className=" px-4 py-2 text-white bg-blue-500 rounded-md" onClick={listUsers}>
            List users
          </button>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={createUser}>
            Create User
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
            {users.status === Status.Success &&
              users.result.map((user, i) => (
                <div key={i} className="mt-4">
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}