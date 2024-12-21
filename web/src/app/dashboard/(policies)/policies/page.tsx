"use client";

import { PolicyTable } from "@/components/policy-table";

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
        await fetchPoliciesFn({ endpoint: "listPolicies" });
      })();
    }
  }, [loading]);

  return (
    <div className="flex flex-col items-center">
      <PolicyTable props={
        {
          policies: policies.data,
          error: policies.error,
          loading,
        }} />
    </div>
  );
}

