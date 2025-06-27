import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Bienvenue sur PetKeeper</h2>
        <p className="text-lg text-gray-700 mb-8">
          Gérez facilement vos propriétaires et leurs animaux.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/owners">
            <Button>Voir les propriétaires</Button>
          </Link>
          <Link href="/animals">
            <Button>Voir les animaux</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
