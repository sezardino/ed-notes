export interface User {
  username: string;
  email: string;
  password: string;
  id: string;
  notes?: Note[];
}

export type ProtectedUser = Omit<User, "password">;

export interface Note {
  id: string;
  name: string;
  body: string;
  categories: string[];
  owner?: User;
  ownerId: string;
  isPublic: boolean;
}
