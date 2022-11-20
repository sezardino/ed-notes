export interface IUser {
  username: string;
  password: string;
  id: string;
  notes?: INote[];
}

export interface INote {
  id: string;
  name: string;
  body: string;
  categories: string[];
  owner?: IUser;
  ownerId: string;
  isPublic: Boolean;
}
