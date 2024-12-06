import { supabase } from "./client"
import { PolicyModel } from "../../database.types";

export const listPolicies = async (): Promise<PolicyModel[]> => {
  try {
    const { data, error } = await supabase.from("policy").select().returns<PolicyModel[]>();

    if (error) {
      throw new Error("PG Error", { cause: error });
    }
    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("An error occurred listing policies", { cause: error });
    }
    throw error;
  }
}