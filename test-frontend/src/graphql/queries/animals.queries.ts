import { gql } from "@apollo/client";

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
