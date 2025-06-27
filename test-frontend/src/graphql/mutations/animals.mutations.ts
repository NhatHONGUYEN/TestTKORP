import { gql } from "@apollo/client";

export const CREATE_ANIMAL = gql`
  mutation CreateAnimal($input: CreateAnimalInput!) {
    createAnimal(input: $input) {
      id
      name
      species
      breed
      dateOfBirth
      weight
      color
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;
