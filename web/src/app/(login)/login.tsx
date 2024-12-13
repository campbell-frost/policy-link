'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';
import { ToggleTheme } from '@/components/toggle-theme';
import Image from 'next/image';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(mode === 'signin' ? signIn : signUp, {error: "", success: ""});

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-center items-center">

          <div className="p-8 sm:mx-auto sm:w-full sm:max-w-md rounded-lg bg-card">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-center text-3xl font-extrabold text-foreground">
                {mode === 'signin'
                  ? 'Sign in to your account'
                  : 'Create your account'}
              </h2>
            </div>

            <form className="space-y-6" action={formAction}>
              <input type="hidden" name="redirect" value={redirect || ''} />
              <input type="hidden" name="priceId" value={priceId || ''} />
              <input type="hidden" name="inviteId" value={inviteId || ''} />
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={50}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground"
                >
                  Password
                </Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={
                      mode === 'signin' ? 'current-password' : 'new-password'
                    }
                    required
                    minLength={8}
                    maxLength={100}
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {state?.error && (
                <div className="text-red-500 text-sm">{state.error}</div>
              )}

              <div>
                <Button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={pending}
                >
                  {pending ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Loading...
                    </>
                  ) : mode === 'signin' ? (
                    'Sign in'
                  ) : (
                    'Sign up'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-foreground">
                    {mode === 'signin'
                      ? "Don't have an account?"
                      : 'Already have an account?'}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${redirect ? `?redirect=${redirect}` : ''
                    }${priceId ? `&priceId=${priceId}` : ''}`}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {mode === 'signin'
                    ? 'Create an account'
                    : 'Sign in to existing account'}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Image
            alt='link-logo'
            src={require("@/assets/images/policyLinkLogo.webp")}
            width={1000}
            height={1000}
          />
          <p>hi</p>
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
}
