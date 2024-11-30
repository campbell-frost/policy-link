'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/Button';

export default function ToggleTheme() {
  const { setTheme, resolvedTheme } = useTheme();
  const dark = resolvedTheme === 'dark';

  const handleThemeChange = () => {
    dark ? setTheme('light') : setTheme('dark');
  };

  return (
    <Button onClick={handleThemeChange} variant="ghost" size="icon">
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-180 dark:scale-0" />
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
