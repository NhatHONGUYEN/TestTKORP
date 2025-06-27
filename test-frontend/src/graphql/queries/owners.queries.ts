import { gql } from "@apollo/client";

export const GET_OWNERS = gql`
  query GetOwners($page: Int = 1, $limit: Int = 10) {
    owners(page: $page, limit: $limit) {
      items {
        id
        firstName
        lastName
        email
        animals {
          id
          name
          species
          breed
        }
      }
      meta {
        totalItems
        itemsPerPage
        totalPages
        currentPage
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
