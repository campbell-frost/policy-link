import { supabase } from "./client"

export type CreatePolicyRequest = {
  yerp: string;
}

export const createPolicy = async (requst: CreatePolicyRequest) => {
  try {
    const { error } = await supabase.from("policy").insert()
  } catch (error) {
    if(error instanceof Error) {
      throw new Error(`An error occured creating a policy: ${error.message}`)
    }
  }
}