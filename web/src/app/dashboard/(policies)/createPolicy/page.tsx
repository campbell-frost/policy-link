"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useApiService } from "@/lib/apiService";
import { UUID } from "crypto";
import { useState } from "react";

type PolicyForm = {
  policyName: string;
  purposeStatement: string;
  policyStatement: string;
  procedure: string;
}

type CreatePolicyRequest = PolicyForm & {
  userId: string;
  id: string;
};

export default function Page() {
  const USER_ID_UNTIL_AUTH_WORKS = "812c7d3e-c9fc-4d56-a931-ce06c8128ab6";
  const [formData, setFormData] = useState<PolicyForm>({
    policyName: "",
    purposeStatement: "",
    policyStatement: "",
    procedure: ""
  });

  const [createPolicyResponse, createPolicyFn] = useApiService();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const createPolicy = async () => {
    createPolicyFn<CreatePolicyRequest>({
      endpoint: "createPolicy",
      body: {
        ...formData,
        userId: USER_ID_UNTIL_AUTH_WORKS,
        id: crypto.randomUUID()
      }
    });
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-lg font-semibold">Policy Name</Label>
        <Input
          name="policyName"
          className="py-7 text-lg"
          placeholder="Enter policy name..."
          value={formData.policyName}
          onChange={handleChange}
        />
      </div>
      <Separator className="my-5" />
      <div className="w-full flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-lg font-semibold">Purpose Statement</Label>
            <Textarea
              name="purposeStatement"
              placeholder="Enter the purpose of this policy..."
              value={formData.purposeStatement}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-lg font-semibold">Policy Statement</Label>
            <Textarea
              name="policyStatement"
              placeholder="Enter the policy statement..."
              value={formData.policyStatement}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Label className="text-lg font-semibold">Procedure</Label>
          <Textarea
            name="procedure"
            placeholder="Enter the procedure details..."
            value={formData.procedure}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button variant={"default"} className="mt-5" onClick={createPolicy}>Create</Button>
      {createPolicyResponse.error && <p>{createPolicyResponse.error}</p>}
      {createPolicyResponse.data! && <p>{JSON.stringify(createPolicyResponse?.data)}</p>}
      {createPolicyResponse.pending && <p>Loading...</p>}
    </div>
  );
}