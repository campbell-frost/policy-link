import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { Button } from "./ui/Button";
import { Menu } from "lucide-react";
export default function NavBar() {
  return (
    <div className="flex w-full justify-between items-center h-16 border-b border-border">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <h1>
          <Link href="/">
            <h1 className="text-2xl font-bold">Policy Link Solutions</h1>
          </Link>
        </h1>
        <div className="items-center gap-4 hidden sm:flex">
          <ToggleTheme />
        </div>
        <div className="sm:hidden flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </div>
      </div>
    </div>
  );
}
