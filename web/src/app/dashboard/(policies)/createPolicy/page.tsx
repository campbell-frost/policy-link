"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useApiService } from "@/hooks/api-service";
import { useState } from "react";

type PolicyForm = {
  name: string;
  purpose: string;
  policyStatement: string;
  procedure: string;
}

type CreatePolicyRequest = PolicyForm & {
  userId: string;
};

export default function Page() {
  const USER_ID_UNTIL_AUTH_WORKS = "812c7d3e-c9fc-4d56-a931-ce06c8128ab6";


  const [formData, setFormData] = useState<PolicyForm>({
    name: "",
    purpose: "",
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
      }
    });
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex justify-between items-center ">
        <div className="flex flex-col">
          <Label className="text-lg font-semibold mb-2">Policy Name</Label>
          <Input
            name="name"
            className="py-7 text-lg"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <Separator className="my-5" />
      <div className="w-full flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-lg font-semibold">Purpose Statement</Label>
            <Textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-lg font-semibold">Policy Statement</Label>
            <Textarea
              name="policyStatement"
              value={formData.policyStatement}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Label className="text-lg font-semibold">Procedure</Label>
          <Textarea
            name="procedure"
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