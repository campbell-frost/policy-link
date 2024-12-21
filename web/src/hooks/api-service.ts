"use client"

import { useState } from "react";
import { useAuth } from "./auth-context";

type ApiRequest<T> = {
  endpoint: string;
  body?: T;
  method?: string;
}

const API_BASE_URL = process.env.POLICY_LINK_API!;

async function sendApiRequest<T, R>(request: ApiRequest<T>, token?: string): Promise<R> {
  try {
    const response = await fetch(`${API_BASE_URL}${request.endpoint}`, {
      method: request.method ?? "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    throw new Error(`${error.message}`);
  }
}

type ApiServiceResponse<T> = {
  data: T | null;
  error: Error | null;
  pending: boolean;
}

function useApiService<T>() {
  const { token } = useAuth();
  const [data, setData] = useState<ApiServiceResponse<T>>({
    data: null,
    error: null,
    pending: false
  });

  const fetchData = async <B>(request: ApiRequest<B>) => {
    setData(() => ({
      data: null,
      error: null,
      pending: true
    }));
    
    try {
      const result = await sendApiRequest<B, T>(request, token || undefined);

      setData({
        data: result,
        error: null,
        pending: false
      });

      return result;
    } catch (error: any) {
      setData({
        data: null,
        error: error,
        pending: false
      });

      return;
    }
  };

  return [data, fetchData] as const;
}

export { useApiService };