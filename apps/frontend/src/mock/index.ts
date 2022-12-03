import { faker } from "@faker-js/faker";
import { INote } from "shared";

import { body } from "./body";

const createMockNotes = (): INote[] => {
  return [...Array(25).keys()].map(() => ({
    body,
    id: faker.datatype.uuid(),
    categories: faker.datatype.array().map((item) => item.toString()),
    isPublic: faker.datatype.boolean(),
    name: faker.lorem.words(3),
    ownerId: faker.datatype.uuid(),
  }));
};

export const mockNotes = createMockNotes();
