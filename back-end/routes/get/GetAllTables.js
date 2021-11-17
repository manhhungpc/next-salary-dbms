import { getUserTables } from "../../utils/query";
import jwt from "jsonwebtoken";

export const GetAllTables = {
  path: "/api/view-tables/:ownerId",
  method: "get",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { ownerId } = req.params;

    //token = Bearer ...sth...
    if (!authorization) return res.status(401).json("No authorize header send!");

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) return res.status(402).json("Unable to verify user");

      const { id } = decode;
      if (ownerId != id) return res.status(403).json("No allow to see own tables");

      try {
        const [info] = await getUserTables(id);
        return res.status(200).json(info);
      } catch (err) {
        console.log(err);
      }
    });
  },
};
