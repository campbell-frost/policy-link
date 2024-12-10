"use client";

import { useState, useEffect, useActionState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PolicyModel } from "../../../database.types";
import { listPolicies } from "@/data/listPolicies";
import { createPolicy, Status } from "@/data/actions";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 p-2">
      <PolicyList />
      <CreatePolicy />
    </div>
  );
}

export function CreatePolicy() {
  const [state, formAction, isPending] = useActionState(createPolicy, null);

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
          <form action={formAction}>
            <div className="flex items-center space-x-2">
              <div className="flex flex-col">
                <label>Name</label>
                <Input name="name" placeholder="Policy Name" />
              </div>
              <div className="flex flex-col">
                <label>Count</label>
                <Input name="count" placeholder="Policy Count" type="number" />
              </div>
            </div>
            {state?.status === Status.error &&
              <h1>An error occured: {state.message}</h1>
            }
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="default"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PolicyList() {
  const [policies, setPolicies] = useState<PolicyModel[]>([]);

  useEffect(() => {
    (async () => {
      setPolicies((await listPolicies()) || []);
    })();
  }, []);

  return (
    <div className="flex flex-col m-2 p-4 rounded-lg bg-card">
      {policies.length > 0 ? (
        policies.map((value, i) => (
          <pre key={i}>{JSON.stringify(value, null, 2)}</pre>
        ))
      ) : (
        <p>No policies found</p>
      )}
    </div>
  );
}
