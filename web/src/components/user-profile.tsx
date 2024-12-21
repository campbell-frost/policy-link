"use client";

import { useAuth } from "@/hooks/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { Separator } from "./ui/separator";

export function UserProfile() {
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9 text-foreground">
          <AvatarImage alt={user?.email || ''} />
          <AvatarFallback className="text-white">
            {user?.email.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        <DropdownMenuItem>
          <Link href="/sign-in">Sign out</Link>
        </DropdownMenuItem>
        <Separator className="my-1" />
        <DropdownMenuItem>
          <Link href={`/dashboard/profile/${user?.id}`}>Profile</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}