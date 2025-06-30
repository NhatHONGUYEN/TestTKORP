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
                Page introuvable
              </h1>
              <p className="text-gray-600">
                Désolé, la page que vous recherchez n&apos;existe pas ou a été
                déplacée.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col lg:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/">Retour à l&apos;accueil</Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/animals">Voir les animaux</Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/owners">Voir les propriétaires</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
