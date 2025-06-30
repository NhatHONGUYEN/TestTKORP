import { Hero } from "@/features/home";

export default function Home() {
  return (
    <Hero
      badge="🐾 PetKeeper"
      heading="Gérez vos animaux facilement"
      description="Plateforme de gestion pour propriétaires d'animaux et leurs compagnons."
      buttons={{
        primary: { text: "Voir les propriétaires", url: "/owners" },
        secondary: { text: "Voir les animaux", url: "/animals" },
      }}
      image={{
        src: "/images/HeroPicture.png",
        alt: "Animaux de compagnie",
      }}
    />
  );
}
