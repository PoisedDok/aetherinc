"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { 
  BarChart3, Globe, LogOut, Loader2, ShieldX, Users, FileText
} from 'lucide-react';
import AdminDashboard from '@/components/sections/AdminDashboard';
import AnalyticsDashboard from '@/components/sections/AnalyticsDashboard';

type ActiveView = 'dashboard' | 'analytics' | 'waitlist' | 'news';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen text-white flex items-center justify-center relative z-20">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center relative z-20">
        <ShieldX className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-400 mb-6">You do not have permission to view this page.</p>
        <Button onClick={() => router.push('/admin/login')} variant="outline" className="border-gray-700">
          Go to Login
        </Button>
      </div>
    );
  }

  const renderActiveView = () => {
    switch(activeView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen text-white relative z-20">
      <header className="border-b border-white/10 px-4 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Aether Inc. Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 hidden sm:inline">
            Welcome, {session.user.name || session.user.email}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-gray-400 hover:text-white border-gray-800"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r border-gray-800 min-h-[calc(100vh-57px)] p-4 sticky top-[57px]">
          <nav className="space-y-1">
            <Button 
              variant={activeView === 'dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveView('dashboard')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button 
              variant={activeView === 'analytics' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveView('analytics')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </nav>

          <div className="pt-8 pb-4">
            <h3 className="text-xs uppercase text-gray-500 font-medium mb-2 px-2">External Links</h3>
            <Link href="/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white text-sm px-2 py-1.5">
              <Globe className="h-4 w-4 mr-2" />
              Website
            </Link>
          </div>
        </aside>

        <main className="flex-1 p-6">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
} 