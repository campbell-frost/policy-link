"use client";

import { useApiService } from "@/hooks/api-service";
import { Policy } from "@/lib/types";
import { useEffect } from "react";

export default function Page() {
  const [policies, fetchPoliciesFn] = useApiService<Policy[]>();

  useEffect(() => {
    (async () => {
      await fetchPoliciesFn({ endpoint: "listPolicies" });
    })();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
     <p>Policies</p>
      <ul>
        {policies.data?.map((policy, i) => (
          <li key={i}>{policy?.id}</li>
        ))}
      </ul>
      {policies.pending && <p>Loading...</p>}
      {policies.error && <p>Error: {policies.errorMessage}</p>}
    </div>
  );
}