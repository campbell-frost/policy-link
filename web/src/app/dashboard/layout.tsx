'use client';

import { Button } from '@/components/ui/button';
import { Sidenav } from '@/components/side-nav';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

function Header() {
  return (
    <header className="border-b-[1px] border-border shrink-0 ">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-[.62rem] flex justify-end items-center">
        <div className="flex items-center space-x-4 ">
          <Button
          >
            <p>This is a button</p>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <SidebarProvider>
        <Sidenav />
        <SidebarInset>
          <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="grid grid-rows-1">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </section>
  );
}
