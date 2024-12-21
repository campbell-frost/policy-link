"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useApiService } from './api-service';

type Token = string | null;

type User = {
  id: string;
  email: string;
  password: string;
  avatar?: string;
}

interface AuthContextType {
  token: string | null;
  setToken: (token: Token) => Promise<void>;
  loading: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<Token>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
    }
    setLoading(false);
  }, []);

  type FetchUserRequest = {
    token: string;
  }

  type FetchUserResponse = {
    id: string;
    email: string;
    password: string;
    token?: string;
  }

  const fetchUser = async (req: FetchUserRequest): Promise<FetchUserResponse> => {
    try {
      const response = await fetch(`${process.env.POLICY_LINK_API!}auth/getUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token: req.token }),
        });

      if (!response.ok) {
        throw new Error("oops");
      }
      const json: FetchUserResponse = await response.json();
      return json;
    } catch (error: any) {
      console.log(error)
      throw new Error(`AHAHKAJKL: ${error.message}`)
    }
  }

  // const [_, fn] = useApiService<User>()
  // const hi = async () => await fn({ endpoint: "auth/getUser", body: { token } })

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setUser(await fetchUser({ token }));
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [token]);

  const setToken = async (token: Token) => {
    setTokenState(token);
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}