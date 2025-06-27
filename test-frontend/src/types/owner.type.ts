import { Animal } from "./animal.type";

export interface Owner {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  animals: Animal[];
}
