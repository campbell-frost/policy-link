import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { UserProvider } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: 'Policy Link Solutions',
  description: 'Policy Manager',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let userPromise = getUser();

  return (
    <html
      lang="en"
      className={`${manrope.className}`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh]">
        <UserProvider userPromise={userPromise}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
