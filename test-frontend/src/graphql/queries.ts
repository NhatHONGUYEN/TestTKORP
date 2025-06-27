import { gql } from "@apollo/client";

// Requêtes pour les animaux
export const GET_ANIMALS = gql`
  query GetAnimals($page: Int = 1, $limit: Int = 10) {
    animals(page: $page, limit: $limit) {
      id
      name
      dateOfBirth
      species
      breed
      color
      weight
      owner {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_ANIMAL_BY_ID = gql`
  query GetAnimalById($id: Int!) {
    findAnimalById(id: $id) {
      id
      name
      dateOfBirth
      species
      breed
      color
      weight
      owner {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

// Requêtes pour les propriétaires
export const GET_OWNERS = gql`
  query GetOwners($page: Int = 1, $limit: Int = 10) {
    owners(page: $page, limit: $limit) {
      id
      firstName
      lastName
      email
      phoneNumber
      animals {
        id
        name
        species
        breed
      }
    }
  }
`;

export const GET_OWNER_BY_ID = gql`
  query GetOwnerById($id: Int!) {
    findOwnerById(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      animals {
        id
        name
        species
        breed
        color
        weight
      }
    }
  }
`;

// Requêtes statistiques
export const GET_OLDEST_ANIMAL = gql`
  query GetOldestAnimal {
    oldestAnimal {
      id
      name
      dateOfBirth
      species
      owner {
        firstName
        lastName
      }
    }
  }
`;

export const GET_MOST_COMMON_SPECIES = gql`
  query GetMostCommonSpecies {
    mostCommonSpecies {
      species
      count
    }
  }
`;

export const GET_OWNER_WITH_MOST_ANIMALS = gql`
  query GetOwnerWithMostAnimals {
    ownerWithMostAnimals {
      owner {
        id
        firstName
        lastName
      }
      animalCount
    }
  }
`;

export const GET_OWNER_WITH_MOST_CATS = gql`
  query GetOwnerWithMostCats {
    ownerWithMostCats {
      owner {
        id
        firstName
        lastName
      }
      catCount
    }
  }
`;

export const GET_OWNER_WITH_HEAVIEST_ANIMAL = gql`
  query GetOwnerWithHeaviestAnimal {
    ownerWithHeaviestAnimal {
      owner {
        id
        firstName
        lastName
      }
      animal {
        id
        name
        weight
      }
    }
  }
`;

export const GET_OWNER_WITH_HEAVIEST_ANIMALS_GROUP = gql`
  query GetOwnerWithHeaviestAnimalsGroup {
    ownerWithHeaviestAnimalsGroup {
      owner {
        id
        firstName
        lastName
      }
      totalWeight
    }
  }
`;

// Mutations
export const CREATE_ANIMAL = gql`
  mutation CreateAnimal($input: CreateAnimalInput!) {
    createAnimal(input: $input) {
      id
      name
      species
      breed
      color
      weight
      dateOfBirth
    }
  }
`;

export const CREATE_OWNER = gql`
  mutation CreateOwner($input: CreateOwnerInput!) {
    createOwner(input: $input) {
      id
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;

export const UPDATE_ANIMAL = gql`
  mutation UpdateAnimal($id: Int!, $input: UpdateAnimalInput!) {
    updateAnimal(id: $id, input: $input) {
      id
      name
      species
      breed
      color
      weight
      dateOfBirth
    }
  }
`;

export const UPDATE_OWNER = gql`
  mutation UpdateOwner($id: Int!, $input: UpdateOwnerInput!) {
    updateOwner(id: $id, input: $input) {
      id
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;

export const DELETE_ANIMAL = gql`
  mutation DeleteAnimal($id: Int!) {
    removeAnimal(id: $id)
  }
`;

export const DELETE_OWNER = gql`
  mutation DeleteOwner($id: Int!) {
    removeOwner(id: $id)
  }
`;
