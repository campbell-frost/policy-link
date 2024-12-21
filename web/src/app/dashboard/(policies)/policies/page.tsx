"use client";

import { ErrorChip } from "@/components/error-chip";
import { Button } from "@/components/ui/button";
import { useApiService } from "@/hooks/api-service";
import { useAuth } from "@/hooks/auth-context";
import { Policy } from "@/lib/types";
import React, { useEffect } from "react";

export default function Page() {
  const [policies, fetchPoliciesFn] = useApiService<Policy[]>();
  const { loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      (async () => {
        await fetchPolicies();
      })();
    }
  }, [loading]);

  const fetchPolicies = async () => {
    await fetchPoliciesFn({ endpoint: "listPolicies" });
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5">Policies</h1>
      <ul>
        {policies.data?.map((policy, i) => (
          <li key={i}>{policy?.id}</li>
        ))}
      </ul>
      {policies.pending && <p>Loading...</p>}
      {policies.error && <ErrorChip error={policies.error} className="mt-4" />}
    </div>
  );
}