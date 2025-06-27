export interface Animal {
  id: number;
  name: string;
  dateOfBirth: string;
  species: string;
  breed: string;
  color: string;
  weight: number;
  owner: {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
  };
}
