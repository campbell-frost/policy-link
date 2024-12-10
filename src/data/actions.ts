"use server";
import { TestDataModel } from "../../database.types";
import { supabase } from "./client";


export type CreatePolicyFormState = {
  message: string;
} | null;

export const createPolicy = async (
  _: CreatePolicyFormState,
  formData: FormData
): Promise<NonNullable<CreatePolicyFormState>> => {
  console.log("creating policy");

  const data: TestDataModel = {
    id: crypto.randomUUID(),
    name: formData.get("name") as string,
    count: parseInt(formData.get("count") as string),
    created_at: new Date().toLocaleDateString(),
  };

  console.log('data', data);
  try {
    const { error } = await supabase.from("test_data").insert(data);

    if (error) {
      return {
        message: error.message
      };
    }

    return { message: "Policy created successfully" };
  } catch (error) {
    return {
      message: error instanceof Error
        ? error.message
        : "An unknown error occurred"
      
    };
  }
};