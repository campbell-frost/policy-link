"use client";
import { listPolicies } from "@/data/listPolicies";
import { useLayoutEffect, useState } from "react";
import { PolicyModel } from "../../../database.types";

export default function Dashboard() {
  return (
    <div className="flex justify-between items-center p-4">
      <PolicyList />
    </div>
  );
}

function PolicyList() {
  const [policies, setPolicies] = useState<PolicyModel[]>([]);
  
  useLayoutEffect(() => {
    (async () => {
      setPolicies(await listPolicies() || []);
    })();
  }, []);

  return (
    <div className="flex flex-col">
      {policies ? (
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