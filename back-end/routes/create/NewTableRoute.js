import jwt from "jsonwebtoken";
import { insertNewTable } from "../../utils/query/Tables";

export const NewTableRoute = {
  path: "/api/new-table/",
  method: "post",
  handler: async (req, res) => {
    const { tableId, name, row, date } = req.body;

    const { authorization } = req.headers;

    //token = Bearer ...sth...
    if (!authorization) return res.status(401).json("No authorize header send!");

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) return res.status(401).json("Unable to verify email");

      const userId = decode.id;

      const data = [tableId, name, row, date, userId];
      await insertNewTable(data);

      return res.status(200).json("Created");
    });
  },
};
