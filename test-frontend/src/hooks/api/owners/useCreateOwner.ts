import { CREATE_OWNER } from "@/graphql/mutations/owners.mutations";
import { useMutation } from "@apollo/client";

export function useCreateOwner() {
  const [createOwner, { loading, error }] = useMutation(CREATE_OWNER);

  const addOwner = async (ownerData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }) => {
    try {
      const { data } = await createOwner({
        variables: {
          input: ownerData,
        },
      });
      return data.createOwner;
    } catch (err) {
      console.error("Erreur lors de la création du propriétaire:", err);
      throw err;
    }
  };

  return { addOwner, loading, error };
}
