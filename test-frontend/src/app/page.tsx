import { Hero } from "@/features/home";

export default function Home() {
  return (
    <Hero
      badge="PetKeeper"
      heading="Gérez vos animaux facilement"
      description="Plateforme de gestion pour propriétaires d'animaux et leurs compagnons."
      buttons={{
        primary: {
          text: "Voir les animaux",
          url: "/animals",
        },
        secondary: {
          text: "Voir les propriétaires",
          url: "/owners",
        },
      }}
      image={{
        src: "/images/HeroPicture.png",
        alt: "Interface de gestion des animaux de compagnie",
      }}
    />
  );
}
