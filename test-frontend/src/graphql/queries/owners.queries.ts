import { gql } from "@apollo/client";

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
      }
    }
  }
`;
