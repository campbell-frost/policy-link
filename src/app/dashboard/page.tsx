"use client";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PolicyModel } from "../../../database.types";
import { listPolicies } from "@/data/listPolicies";


export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 p-2">
      <PolicyList />
      <CreatePolicy />
    </div>
  );
}

export function CreatePolicy() {
  return (
    <div className="m-2 p-4 rounded-lg bg-card">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Policy</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Policy</DialogTitle>
            <DialogDescription>
              This will add a new policy to the database
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <label>Name</label>
              <Input placeholder="hi" />
            </div>
            <div className="flex flex-col">
              <label>Purpose</label>
              <Input placeholder="hi" />
            </div>
          </div>
          <Input placeholder="hi" />
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="secondary">2343
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="default">
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PolicyList() {
  const [policies, setPolicies] = useState<PolicyModel[]>([]);

  useEffect(() => {
    (async () => {
      setPolicies(await listPolicies() || []);
    })();
  }, []);

  return (
    <div className="flex flex-col m-2 p-4 rounded-lg bg-card">
      {policies.length > 0 ? (
        policies.map((value, i) => (
          <pre key={i}>
            {JSON.stringify(value, null, 2)}
          </pre>
        ))
      ) : (
        <p>No policies found</p>
      )}
    </div>
  );
}