// Fonction pour générer des avatars aléatoires d'Unsplash
export const getOwnerAvatar = (id: number): string => {
  const seeds = [
    "1494790108377-be9c29b29330",
    "1507003211169-0a1dd7228f2d",
    "1472099645785-5658abf4ff4e",
    "1438761681033-6461ffad8d80",
    "1500648767791-00dcc994a43e",
    "1534528741775-53994a69daeb",
    "1517841905240-472988babdf9",
    "1506794778202-cad84cf45f1d",
    "1544005313-94ddf0286df2",
    "1531427186611-ecfd6d936c79",
    "1517841905240-472988babdf9",
    "1507003211169-0a1dd7228f2d",
    "1472099645785-5658abf4ff4e",
    "1438761681033-6461ffad8d80",
    "1500648767791-00dcc994a43e",
  ];

  const seed = seeds[id % seeds.length];
  return `https://images.unsplash.com/photo-${seed}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;
};

// Fonction pour générer des avatars d'animaux avec une grande variété
export const getAnimalAvatar = (id: number): string => {
  const animalPhotos = [
    "1552053831-71594a27632d", // chien golden retriever
    "1583337130417-3346a1be7dee", // chat orange
    "1425082661705-1834bfd09dca", // chien labrador
    "1583337130417-3346a1be7dee", // chat orange (répété)
    "1552053831-71594a27632d", // chien golden retriever (répété)
    "1583337130417-3346a1be7dee", // chat orange (répété)
    "1552053831-71594a27632d", // chien golden retriever (répété)
    "1583337130417-3346a1be7dee", // chat orange (répété)
    "1574158622682-e40e69881006", // chat gris
    "1587300003388-59208cc962cb", // chien beagle
    "1552053831-71594a27632d", // chien golden retriever (répété)
    "1518717758536-85ae29035b6d", // chat noir
    "1601758125946-6ec2ef64daf8", // chien labrador chocolat
    "1583337130417-3346a1be7dee", // chat orange (répété)
    "1561037404-61cd46aa615b", // chien berger allemand
    "1552053831-71594a27632d", // chien golden retriever (répété)
    "1583337130417-3346a1be7dee", // chat orange (répété)
    "1574158622682-e40e69881006", // chat gris (répété)
    "1587300003388-59208cc962cb", // chien beagle (répété)
    "1518717758536-85ae29035b6d", // chat noir (répété)
  ];

  const photoId = animalPhotos[id % animalPhotos.length];
  return `https://images.unsplash.com/photo-${photoId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80`;
};
