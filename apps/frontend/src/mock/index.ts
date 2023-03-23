import { faker } from "@faker-js/faker";
import { Note } from "shared";

import { body } from "./body";

const createMockNotes = (): Note[] => {
  return [...Array(25).keys()].map(() => ({
    name: faker.lorem.words(3),
    id: faker.datatype.uuid(),
    categories: faker.datatype.array().map((item) => item.toString()),
    isPublic: faker.datatype.boolean(),
    ownerId: faker.datatype.uuid(),
    body,
  }));
};

export const mockNotes = createMockNotes();
