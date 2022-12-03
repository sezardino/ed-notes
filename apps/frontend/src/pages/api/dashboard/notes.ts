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

  res.status(200).json({ notes: mockNotes });
}
