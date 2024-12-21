"use client";

import { Policy } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Skeleton } from "./ui/skeleton";

type PolicyTableProps = {
  props: {
    policies: Policy[] | null;
    loading: boolean;
    error: Error | null;
  }
};

export function PolicyTable({ props }: PolicyTableProps) {
  return (
    (props.loading
      ? <TableSkeleton />
      : <TableData policies={props.policies} />
    )
  );
}

type TableDataProps = {
  policies: Policy[] | null;
}

function TableData({ policies }: TableDataProps) {
  return (
    <Table>
      <TableCaption>Policies</TableCaption>
      <TableHeader className="bg-card rounded-md">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Reviewed</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {policies?.map((policy) => (
          <TableRow key={policy?.id}>
            <TableCell>{policy?.name}</TableCell>
            <TableCell>{policy?.purpose}</TableCell>
            <TableCell>
              <Status active={policy?.active} />
            </TableCell>
            <TableCell>{policy?.lastApproved}</TableCell>
            <TableCell>
              <Button variant={"ghost"}>
                <DotsVerticalIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type StatusProps = {
  active: boolean | undefined;
}

function Status({ active }: StatusProps) {
  return (
    <span
      className={`
        px-3 py-1 
        text-xs font-medium 
        rounded-full 
        inline-flex items-center
        ${active
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        }
      `}
    >
      <span className={`mr-1.5 h-2 w-2 rounded-full ${active ? "bg-green-500" : "bg-red-500"
        }`} />
      {active ? "Active" : "Inactive"}
    </span>
  );
}


function TableSkeleton() {
  return (
    <Table >
      <TableHeader className="bg-card rounded-md">
          <TableRow>
            <TableHead><Skeleton className="h-4 w-[200px]" /></TableHead>
            <TableHead><Skeleton className="h-4 w-[200px]" /></TableHead>
            <TableHead><Skeleton className="h-4 w-[200px]" /></TableHead>
            <TableHead><Skeleton className="h-4 w-[200px]" /></TableHead>
            <TableHead><Skeleton className="h-4 w-[200px]" /></TableHead>
          </TableRow>
      </TableHeader>
      <TableBody>
        {Array(5).fill(0).map((_, index) => (
          <TableRow key={index}>
            <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};