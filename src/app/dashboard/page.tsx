"use client";

import { listPolicies } from "@/data/listPolicies";
import { useEffect, useState } from "react";
import { PolicyModel } from "../../../database.types";

export default function Dashboard() {
  const [policies, setPolicies] = useState<PolicyModel[]>()
  useEffect(() => {
    (async () => {
      setPolicies(await listPolicies());
    })()
  }, [])
  return (
    <div className="flex justify-center items-center min-h-full">
      {policies?.map((v,i) => (
        <pre key={i}>
          {JSON.stringify(v, null, 2)}
        </pre>
      ))}
    </div>
  );
}