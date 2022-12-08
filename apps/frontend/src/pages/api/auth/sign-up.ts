// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthInput, ProtectedUser } from "shared";

export default function auth(
  req: NextApiRequest,
  res: NextApiResponse<ProtectedUser>
) {
  if (req.method !== "POST") res.status(400);

  const body = req.body as AuthInput;
  console.log(body);

  res
    .status(200)
    .json({ id: "1", notes: [], email: "email", username: "name" });
}
