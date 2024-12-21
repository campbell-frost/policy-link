'use client'

import { useEffect } from 'react'

export function ErrorChip({
  error,
}: {
  error: Error
}) {

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="bg-muted border border-red-400 text-foreground p-4 rounded-lg">
      <p className="text-sm text-muted-foreground">
        Error: {error.message || "Unknown error"}
      </p>
    </div>
  )
}

