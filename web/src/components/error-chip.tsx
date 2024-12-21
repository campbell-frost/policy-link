'use client'

import { useEffect } from 'react'
import { cn } from "@/lib/utils"

export function ErrorChip({
  error,
  className,
}: {
  error: Error
  className?: string
}) {

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={cn("bg-muted border border-red-400 text-foreground p-4 rounded-lg", className)}>
      <p className="text-sm text-muted-foreground">
        Error: {error.message || "Unknown error"}
      </p>
    </div>
  )
}
