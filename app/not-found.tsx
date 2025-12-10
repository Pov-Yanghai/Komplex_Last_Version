import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 text-center">
        <div className="text-6xl">404</div>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground">Could not find the requested resource</p>
        <Link href="/">
          <Button className="mt-4">Return Home</Button>
        </Link>
      </div>
    </div>
  )
}
