"use server";

import { TestDataModel } from "../../database.types";
import { supabase } from "./client";

export enum Status {
  success,
  error,
}

export type CreatePolicyFormState = {
  status: Status.success
} | {
  status: Status.error,
  message: string,
} | null;

export const createPolicy = async (
  _: CreatePolicyFormState,
  formData: FormData
): Promise<NonNullable<CreatePolicyFormState>> => {

  const data: TestDataModel = {
    id: crypto.randomUUID(),
    name: formData.get("name") as string,
    count: parseInt(formData.get("count") as string),
    created_at: new Date().toLocaleDateString(),
  };

  try {
    const { error } = await supabase.from("test_data").insert(data);

    if (error) {
      return {
        status: Status.error,
        message: error.message
      };
    }

    return { 
      status: Status.success,
     };
  } catch (error) {
    return {
      status: Status.error,
      message: error instanceof Error
        ? error.message
        : `An unknown error occurred: ${error}`
    };
  }
};