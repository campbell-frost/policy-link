import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center space-x-4">
            <h1 className="text-4xl font-bold">404</h1>
            <div className="h-8 w-px bg-border" aria-hidden="true" />
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Oops! The page you're looking for doesn't exist.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
