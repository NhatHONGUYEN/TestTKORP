import { Hero } from "@/features/home";

export default function Home() {
  return (
    <Hero
      badge="PetKeeper"
      heading={
        <>
          Manage your pets <span className="text-orange-500">easily</span>
        </>
      }
      description="Management platform for pet owners and their companions."
      buttons={{
        primary: {
          text: "See animals",
          url: "/animals",
        },
        secondary: {
          text: "See owners",
          url: "/owners",
        },
      }}
      image={{
        src: "/images/HeroPicture.png",
        alt: "Pet management interface",
      }}
    />
  );
}
