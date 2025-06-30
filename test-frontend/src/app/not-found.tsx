import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {/* Icône 404 */}
            <div className="text-6xl font-bold text-gray-300">404</div>

            {/* Titre */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Page not found
              </h1>
              <p className="text-gray-600">
                Sorry, the page you are looking for does not exist or has been
                moved.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col lg:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/">Back to home</Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/animals">See animals</Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/owners">See owners</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
