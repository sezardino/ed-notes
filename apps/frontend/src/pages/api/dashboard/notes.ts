import type { NextApiRequest, NextApiResponse } from "next";
import { INote } from "shared";

import { mockNotes } from "@/mock";

export interface ApiNotesResponse {
  notes: INote[];
}

export default function auth(
  req: NextApiRequest,
  res: NextApiResponse<ApiNotesResponse>
) {
  if (req.method !== "GET") res.status(400);
  const search = req.query.search as string;

  const notes = search
    ? mockNotes.filter(
        (note) =>
          note.body.includes(search) ||
          note.categories.includes(search) ||
          note.name.includes(search)
      )
    : mockNotes;

  res.status(200).json({ notes });
}
