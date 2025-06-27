import { gql } from "@apollo/client";

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
