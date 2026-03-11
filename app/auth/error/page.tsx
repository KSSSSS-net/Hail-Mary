import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border bg-card text-center">
        <CardHeader className="space-y-2">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-xl bg-destructive/10">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Authentication Error</CardTitle>
          <CardDescription className="text-muted-foreground">
            Something went wrong during authentication. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href="/auth/login">
            <Button className="w-full transition-all duration-300 ease-out hover:scale-[1.02]">
              Try again
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full transition-all duration-300 ease-out hover:scale-[1.02]">
              Go home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
