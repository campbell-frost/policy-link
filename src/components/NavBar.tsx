import Link from "next/link";
import ToggleTheme from "./ToggleTheme";

export default function NavBar() {
  return (
    <div className="flex w-full justify-between items-center h-16 border-b border-border">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <h1>
          <Link href="/">
            <h1 className="text-2xl font-bold">Policy Link Solutions</h1>
          </Link>
        </h1>
        <div className="flex items-center gap-4">
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
}
