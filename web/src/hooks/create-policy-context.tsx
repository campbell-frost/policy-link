"use client";

import react, { createContext, useContext, useState } from "react";
import { Policy } from "@/lib/types";

interface PolicyFormContextType {
  policyState: Policy;
  setPolicyState: react.Dispatch<React.SetStateAction<Policy>>;
}

const CreatePolicyContext = createContext<PolicyFormContextType | undefined>(undefined);

export const CreatePolicyProvider = ({
  children
}: {
  children: React.ReactNode
}) => {

  const [policyState, setPolicyState] = useState<Policy>({
    id: "",
    userId: "",
    name: "",
    purpose: "",
    procedure: "",
    policyStatement: "",
    equipment: "",
    addendums: "",
    active: false,
    attachments: "",
    references: "",
    relatedLinks: "",
    originationDate: "",
    effectiveDate: "",
    lastApproved: "",
    lastRevised: "",
    nextReview: "",
    ownerId: "",
    area: "",
    signatures: []
  });

  return (
    <CreatePolicyContext.Provider value={{ policyState, setPolicyState }}>
      {children}
    </CreatePolicyContext.Provider>
  );
};

export const usePolicyContext = () => {
  const context = useContext(CreatePolicyContext);
  if (context === undefined) {
    throw new Error("usePolicyForm must be used within a PolicyFormProvider");
  }
  return context;
};