import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="flex w-full justify-between items-center h-16 border-t border-border">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <p>© {year} Policy Link Solutions</p>
        <p>
          <Link href="/about">About</Link>
        </p>
      </div>
    </div>
  );
}
