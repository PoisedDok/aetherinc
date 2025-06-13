"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Loader2 } from 'lucide-react';

// Component to handle search params with Suspense
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      router.push(callbackUrl);
    }
  }, [session, status, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (result?.error) {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      } else if (result?.ok) {
        // The useEffect will handle the redirect
      }
    } catch (err) {
      console.error('Login submission error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-gray-900 border-gray-800">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <Shield className="h-12 w-12 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-400 mt-2">Sign in to access the admin dashboard</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@aetherinc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
              disabled={isLoading || status === 'authenticated'}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

// Main component with Suspense
export default function AdminLogin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
} 