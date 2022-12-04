import type { NextApiRequest, NextApiResponse } from "next";
import { INote } from "shared";

import { mockNotes } from "@/mock";

export interface ApiNoteResponse {
  note?: INote;
}

interface GetParams {
  id: string;
}

export default function auth(
  req: NextApiRequest,
  res: NextApiResponse<ApiNoteResponse>
) {
  if (req.method === "GET") {
    const { id } = req.query as unknown as GetParams;

    res.status(200).json({ note: mockNotes.find((note) => note.id === id) });
  } else if (req.method === "DELETE") {
    console.log("delete");
  } else if (req.method === "PUT") {
    console.log("put");
  } else {
    res.status(400);
  }
}
