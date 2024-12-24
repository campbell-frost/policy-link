"use client";

import react, { useEffect } from "react";
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { defineStepper } from "@stepperize/react"
import { CreatePolicyProvider, usePolicyContext } from "@/hooks/create-policy-context";
import { useApiService } from "@/hooks/api-service";
import { Policy } from "@/lib/types";
import { useAuth } from "@/hooks/auth-context";
import { ErrorChip } from "@/components/error-chip";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.bubble.css';

const { useStepper, steps } = defineStepper(
  {
    id: 'about',
    title: 'About',
    description: 'Details about the policy',
  },
  {
    id: 'procedure',
    title: 'Procedure',
    description: 'Enter policy procedures.',
  },
  { id: 'complete', title: 'Complete', description: 'Checkout complete' }
);

export default function Page() {
  const stepper = useStepper();

  return (
    <CreatePolicyProvider>
      <div className="space-y-6 p-6  rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-2xl font-medium">Create Policy</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Step {stepper.current.index + 1} of {steps.length}
            </span>
            <div />
          </div>
        </div>
        <nav aria-label="Checkout Steps" className="group my-4">
          <ol
            className="flex items-center justify-between gap-2"
            aria-orientation="horizontal"
          >
            {stepper.all.map((step, index, array) => (
              <react.Fragment key={step.id}>
                <li className="flex items-center gap-4 flex-shrink-0">
                  <Button
                    type="button"
                    role="tab"
                    variant={
                      index <= stepper.current.index ? 'default' : 'secondary'
                    }
                    aria-current={
                      stepper.current.id === step.id ? 'step' : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className="flex size-10 items-center justify-center rounded-full"
                    onClick={() => stepper.goTo(step.id)}
                  >
                    {index + 1}
                  </Button>
                  <span className="text-sm font-medium">{step.title}</span>
                </li>
                {index < array.length - 1 && (
                  <Separator
                    className={`flex-1 ${index < stepper.current.index ? 'bg-primary' : 'bg-muted'
                      }`}
                  />
                )}
              </react.Fragment>
            ))}
          </ol>
        </nav>
        <div className="space-y-4">
          {stepper.switch({
            about: () => <About />,
            procedure: () => <Procedure />,
            complete: () => <Complete />,
          })}
          {!stepper.isLast && (
            <div className="flex justify-end gap-4">
              <Button
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
              >
                Back
              </Button>
              <Button onClick={stepper.next}>
                {stepper.isLast ? 'Complete' : 'Next'}
              </Button>
            </div>
          )}
        </div>
      </div>
      <PolicyState />
    </CreatePolicyProvider>
  );
}

function About() {
  const { policyState, setPolicyState } = usePolicyContext();
  return (
    <div className="grid grid-cols-2 gap-4 mt-10">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-start">
          Name
        </label>
        <Input
          id="name"
          placeholder="Policy that hurts people"
          className="w-full"
          value={policyState?.name}
          onChange={(e) => setPolicyState({ ...policyState!, name: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="address" className="text-sm font-medium text-start">
          Policy Statement
        </label>
        <Input
          id="policyStatement"
          placeholder="lorum ipsum"
          className="w-full"
          value={policyState?.policyStatement}
          onChange={(e) => setPolicyState({ ...policyState!, policyStatement: e.target.value })}
        />
      </div>
    </div>
  );
}

function Procedure() {
  const { quill, quillRef } = useQuill({ theme: 'bubble'});
  const { policyState, setPolicyState } = usePolicyContext();
  
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setPolicyState({ ...policyState!, procedure: quill.root.innerHTML });
      });
    }
  }, [quill, policyState, setPolicyState]);

  return (
    <div className="flex justify-center min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-md">
      <div ref={quillRef} id="procedure" className="w-full" />
    </div>
  );
}

type CreatePolicyRequest = Policy;

function Complete() {
  const { policyState, setPolicyState } = usePolicyContext();
  const { user } = useAuth();
  const [createPolicyResponse, createPolicyFn] = useApiService();

  const createPolicy = async () => {
    setPolicyState({ ...policyState!, userId: user?.id! });
    console.log(policyState, typeof policyState);
    createPolicyFn<CreatePolicyRequest>({
      endpoint: "createPolicy",
      body: policyState,
    });
  }

  return (
    <div>
      <h3 className="text-lg py-4 font-medium">Stepper complete 🔥</h3>
      <Button onClick={createPolicy}>Create Policy</Button>
      {createPolicyResponse.error && <ErrorChip error={createPolicyResponse.error} />}
      {createPolicyResponse.pending && <p>Loading...</p>}
    </div>
  );
}

function PolicyState() {
  const { policyState } = usePolicyContext();
  return (
    <pre className="flex justify-center max-w-full overflow-x-auto " style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {JSON.stringify(policyState!, null, 2)}
    </pre>
  );
}
