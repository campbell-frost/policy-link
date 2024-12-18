"use client"

import { config } from "dotenv";
import { useState } from "react";

type ApiRequest<T> = {
  endpoint: string;
  body?: T;
  method?: string;
  token?: string;
}

config();
const API_BASE_URL = process.env.POLICY_LINK_API || "http://localhost:1738/";

async function sendApiRequest<T, R>(request: ApiRequest<T>): Promise<R> {
  try {
    const response = await fetch(`${API_BASE_URL}${request.endpoint}`, {
      method: request.method ?? "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${request.token}`,
      },
      body: request.body ? JSON.stringify(request.body) : JSON.stringify({}),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

function useApiService<T>() {
  const [data, setData] = useState<{
    data: T | null;
    error: boolean;
    errorMessage: string | null;
    pending: boolean;
  }>({
    data: null,
    error: false,
    errorMessage: null,
    pending: false
  });

  const fetchData = async <B>(request: ApiRequest<B>) => {
    setData(() => ({
      data: null,
      error: false,
      errorMessage: null,
      pending: true
    }));

    try {
      const result = await sendApiRequest<B, T>(request);
      
      setData({
        data: result,
        errorMessage: null,
        error: false,
        pending: false
      });

      return result;
    } catch (error: any) {
      setData({
        data: null,
        error: true,
        errorMessage: error.message,
        pending: false
      });

      throw error;
    }
  };

  return [data, fetchData] as const;
}

export { useApiService };